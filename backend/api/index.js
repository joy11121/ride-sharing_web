import dayjs from 'dayjs';
import {v4 as uuidv4} from 'uuid';
import model from '../model/index.js';

const userModel = model.userModel;

/**
 * transform {hour, minute, ...} to minute
 * @param {Number} time.hour
 * @param {Number} time.minute
 * @returns {Number}
 */
const getMinute = (time) => {
    return 60 * time.hour + time.minute;
}

/**
 * http post, update the user's information
 */
const update = async (req, res) => {
    console.log('update =>', req.body);
    const body = req.body, id = body.id;
    res.json(await userModel.findOneAndUpdate({id}, body, {
        new: true, projection: {_id: 0, __v: 0}, upsert: true,
    }).exec());
}

/**
 * http get, query the user's information
 */
const query = async (req, res) => {
    console.log('query =>', req.query);
    const {id} = req.query;
    var user = await userModel.findOne({id}, {_id: 0, __v: 0}).exec();

    if (!user) {
        user = await userModel.findOneAndUpdate({id}, {id}, {
            upsert: true, new: true, projection: {_id: 0, __v: 0},
        }).exec();
    }

    res.json(user);
}

/**
 * http post, host a rideshare
 */
const host = async (req, res) => {
    // req.body.no = uuidv4();
    req.body.no = req.body.drv_id;  // debug
    req.body.price = parseInt(req.body.price);
    req.body.capacity = parseInt(req.body.capacity);

    console.log('host =>', req.body);
    var {
        price,
        drv_id,
        schedule,   // { stop, hour, minute }

        date,   // { year, month, day } required but not used
        veh_no, // required but not used
        capacity,   // required but not used
    } = req.body;

    // calculate zone fares
    req.body.zone_fare = [];
    const L = schedule.length, base = getMinute(schedule[0]), intv = getMinute(schedule[L - 1]) - base;
    for (let i = 0; i < L; i++)
        req.body.zone_fare.push(price * (getMinute(schedule[i]) - base) / intv);

    req.body.volume = new Array(L).fill(0);

    await userModel.updateOne({id: drv_id}, {rideshare: req.body});
    res.end();
}

/**
 * http post, unhost a rideshare
 */
const unhost = async(req, res) => {
    console.log('unhost =>', req.body);
    const {drv_id} = req.body;

    const {rideshare} = (await userModel.aggregate([
        {$match: {id: drv_id}},
        {$project: {_id: 0, 'rideshare.pax_cnt': 1}}
    ]))[0], {pax_cnt} = rideshare;

    if (pax_cnt) {
        res.send(`TOO LAAAAATE`);
        return;
    }

    await userModel.updateOne({id: drv_id}, {rideshare: null}).exec();
    res.end();
}

/**
 * http post, reserve a rideshare
 */
const reserve = async (req, res) => {
    req.body.count = parseInt(req.body.count);

    console.log('reserve =>', req.body);
    const {
        drv_id,
        pax_id,
        count,
        dep,
        arr,
        no,
    } = req.body;

    const {$y, $M, $D, $H, $m} = dayjs();
    const result = await userModel.findOne({    // condition
        id: drv_id,
        rideshare: {$ne: null},
        'rideshare.no': no,
    }, {    // projection
        name: 1, rideshare: 1
    })

    if (!result)
        return res.send(`RIDESHARE NOT FOUND`);

    const {name, rideshare} = result;
    const {
        date,
        veh_no,
        schedule,
        capacity,
        zone_fare,

        volume,
    } = rideshare;

    // check date & time
    const deadline = new Date(date.year, date.month, date.day,
        schedule[0].hour, schedule[0].minute);
    if (deadline.getTime() < Date.now())    // todo: buffer
        return res.send(`TOO LAAAAATE`);

    // check capacity
    const dep_idx = await schedule.findIndex((s) => dep === s.stop),
        arr_idx = await schedule.findIndex((s) => arr === s.stop);

    for (let idx = dep_idx; idx < arr_idx; idx++) {
        if (capacity < volume[idx] + count) {
            return res.send('FUUUUULL');
        }
    }

    for (let idx = dep_idx; idx < arr_idx; idx++)
        volume[idx] += count;

    // construct reservation
    const reservation = {
        // no: uuidv4(),
        no: pax_id, // debug
        date: date,
        veh_no: veh_no,
        drv_id: drv_id,
        drv_name: name,
        dep: schedule[dep_idx],
        arr: schedule[arr_idx],
        count: count,
        unit_fare: zone_fare[arr_idx] - zone_fare[dep_idx],
    };
    await userModel.updateOne({id: pax_id}, {$push: {reservation: reservation}}).exec();

    // modify rideshare
    await userModel.updateOne({id: drv_id}, {
        'rideshare.volume': volume,
        $inc: {
            'rideshare.pax_cnt': count,
            'rideshare.revenue': count * reservation.unit_fare
        },
        $push: {'rideshare.reservation': {no: reservation.no, pax_id: pax_id}},
    }).exec();

    res.end();
}

/**
 * http post, cancel a reservation
 */
const cancel = async (req, res) => {
    console.log('cancel =>', req.body);
    const {
        no, // reservation no
        pax_id,
    } = req.body;

    const {
        date,
        drv_id,
        dep,
        arr,
        count,
        unit_fare
    } = (await userModel.findOne({id: pax_id}, {reservation: 1})
        .exec()).reservation.filter((rsv) => {return no === rsv.no;})[0];

    // check date
    const deadline = new Date(date.year, date.month, date.day,
        dep.hour, dep.minute);
    if (deadline.getTime() <= Date.now())
        return res.send(`TOO LAAAAATE`);

    // remove reservation
    await userModel.updateOne({id: pax_id}, {$pull: {reservation: {no: no}}});

    // update rideshare
    const {_id, rideshare} = await userModel.findOne({id: drv_id},{rideshare: 1,}),
        {schedule, volume} = rideshare;

    const dep_idx = schedule.findIndex((s) => dep.stop === s.stop),
        arr_idx = schedule.findIndex((s) => arr.stop === s.stop);
    for (let idx = dep_idx; idx < arr_idx; idx++)
        volume[idx] -= count;

    await userModel.updateOne({id: drv_id}, {
        'rideshare.volume': volume,
        $inc: {
            'rideshare.pax_cnt': -count,
            'rideshare.revenue': -count * unit_fare
        },
        $pull: {'rideshare.reservation': {no: no, pax_id: pax_id}},
    }).exec();

    res.end();
}

/**
 * http get, search for rideshare
 */
const search = async (req, res) => {
    console.log('search =>', req.query);
    var {year, month, day, hour, minute, departure, arrival, count} = req.query;
    const threshold = getMinute({hour: parseInt(hour), minute: parseInt(minute)});
    count = parseInt(count);

    // construct aggregation pipeline
    const date = {
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day)
    };

    const result = (await userModel.aggregate([
        {$match: {rideshare: {$ne: null}}},
        {$match: {'rideshare.date': date}},
        {$match: {'rideshare.schedule.stop': {$in: [departure]}}},
        {$match: {'rideshare.schedule.stop': {$in: [arrival]}}},
        {$project: {_id: 0, id: 1, name: 1, rideshare: 1,
            accum_score: 1, accum_count: {$sum: '$rating'}}},
    ]))
    .filter((rst) => {
        const {rideshare} = rst, {schedule} = rideshare,
            dep_idx = schedule.findIndex((s) => departure === s.stop),
            arr_idx = schedule.findIndex((s) => arrival === s.stop);

        // check order
        if (arr_idx <= dep_idx)
            return false;

        // check time
        if (getMinute(schedule[dep_idx]) <= threshold)
            return false;

        // check capacity
        for (let idx = dep_idx; idx < arr_idx; idx++) {
            if (rideshare.capacity < rideshare.volume[idx] + count)
                return false;
        }

        return true;
    }).map((rst) => {
        const {id, name, accum_score, accum_count, rideshare} = rst;
        const dep_idx = rideshare.schedule.findIndex((s) => departure === s.stop),
            arr_idx = rideshare.schedule.findIndex((s) => arrival === s.stop);

        return {
            drv_id: id,
            drv_name: name,
            drv_rating: accum_count ? accum_score / accum_count : 0,
            no: rideshare.no,
            // volume: rideshare.volume,
            pax_cnt: rideshare.pax_cnt,
            schedule: rideshare.schedule,
            unit_fare: rideshare.zone_fare[arr_idx] - rideshare.zone_fare[dep_idx],
        }
    });

    res.json(result);
}

/**
 * http post, finish a rideshare
 */
const complete = async (req, res) => {
    console.log('complete =>', req.body);
    const {
        drv_id,
    } = req.body;

    const {rideshare} = await userModel.findOne({id: drv_id}, {rideshare: 1,}).exec();
    const {
        date,
        schedule,
    } = rideshare;

    // check time
    const L = schedule.length, threshold =
        new Date(date.year, date.month - 1, date.day, schedule[L - 1].hour, schedule[L - 1].minute);
    if (Date.now() < threshold.getTime())
        return res.send(`NOT YET`);

    // move rideshare to history
    rideshare.state = 1;
    await userModel.updateOne({id: drv_id}, {
        rideshare: null,
        $inc: {revenue: rideshare.revenue},
        $push: {'rideshare_hist': rideshare},
    }).exec();

    // inform pax (faster?)
    const {reservation} = rideshare;
    for (let {no, pax_id} of reservation) {
        const {reservation} = (await userModel.findOne({id: pax_id}, {reservation: 1}));
        const L = reservation.length;
        for (let i = 0; i < L; i++) {
            if (no === reservation[i].no) {
                reservation[i].state = 1;
                break;
            }
        }
        await userModel.updateOne({id: pax_id}, {reservation: reservation});
    }
    res.end();
}

/**
 * todo
 * http post, rating a driver
 */
const rate = async (req, res) => {
    console.log('rating =>', req.body);
    req.body.score = parseInt(req.body.score);
    const {
        no, // reservation no
        pax_id,
        score,
    } = req.body;

    let reservation = (await userModel.findOne({id: pax_id}, {reservation: 1}).exec())
        .reservation.filter((rsv) => {return no === rsv.no})
    reservation = reservation[0];
    // console.log(reservation)

    await userModel.updateOne({id: pax_id}, {
        $pull: {reservation: {'reservation.no': no}},
        $push: {reservation_hist: reservation}, 
    }).exec();

    const {rating} = await userModel.findOne({id: reservation.drv_id}, {rating: 1}).exec();
    rating[score - 1]++;

    await userModel.updateOne({id: reservation.drv_id}, {
        rating: rating,
        $inc: {
            accum_score: score,
        }
    })

    res.end();
}

export default {
    update,
    query,
    host,
    unhost,
    reserve,
    cancel,
    search,
    complete,
    rate
}