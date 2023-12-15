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
    const body = req.body, id = body.id;
    res.json(await userModel.findOneAndUpdate({id}, body, {
        new: true, projection: {_id: 0, __v: 0}, upsert: true,
    }).exec());
}

/**
 * http get, query the user's information
 */
const query = async (req, res) => {
    const {id} = req.query;
    const user = await userModel.findOne({id}, {_id: 0, __v: 0}).exec();

    if (user) {
        res.json(user);
    } else {
        res.json(await userModel.findOneAndUpdate({id}, {id}, {
            upsert: true, new: true, projection: {_id: 0, __v: 0},
        }).exec());
    }
}

/**
 * http post, host a rideshare
 */
const host = async (req, res) => {
    const {
        price,
        drv_id,
        schedule,   // { stop, hour, minute }

        date,   // { year, month, day } required but not used
        veh_no, // required but not used
        capacity,   // required but not used
    } = req.body;
    req.body.no = uuidv4();
    req.body.no = drv_id;   // testing

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
        name: 1, rideshare: 1,
        // gender: 1,
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
        pax_cnt,

        volume,
    } = rideshare;

    // check date & time
    const deadline = new Date(date.year, date.month - 1, date.day,
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
        date: date,
        veh_no: veh_no,
        drv_id: drv_id,
        drv_name: name,
        dep: schedule[dep_idx],
        arr: schedule[arr_idx],
        pax_cnt: count,
        unit_fare: zone_fare[arr_idx] - zone_fare[dep_idx],
    };
    await userModel.updateOne({id: pax_id}, {$push: {reservation: reservation}}).exec();

    // modify rideshare
    await userModel.updateOne({id: drv_id}, {
        'rideshare.volume': volume,
        'rideshare.pax_cnt': pax_cnt + count,
    }).exec();
    console.log(rideshare);

    res.end();
}

/**
 * http post, cancel a rideshare reservation
 * @param {Request} req 
 * @param {Response} res 
 */
const cancel = async (req, res) => {
    const {
        no, // reservation no
    } = req.body;

    const {
        date,
        pax_id,
        dep_idx,
        arr_idx,
        rideshare   // rideshare no
    } = await model.ongoing_reservation.findOne({no},{
        _id: 0,
        date: 1,
        pax_id: 1,
        dep_idx: 1,
        arr_idx: 1,
        rideshare: 1,
    }).exec();

    const {
        schedule
    } = await model.ongoing_rideshare.findOne({no: rideshare},{
        _id: 0,
        schedule: 1,
    }).exec();

    // check date
    const deadline = new Date(
        date.year, date.month - 1, date.day, schedule[0].hour, schedule[0].minute);
    if (deadline.getTime() <= Date.now()) {
        res.send(`TOO LAAAAATE`);
        return;
    }

    // cancel reservation
    for (let idx = dep_idx; idx <= arr_idx; idx++)
        schedule[idx].volume--;

    await model.ongoing_rideshare.updateOne({no: rideshare},
        {schedule: schedule}).exec();   // update rideshare schedule

    await model.ongoing_rideshare.updateOne({no: rideshare},
        {$pull: {reservation: no}}).exec(); // remove reservation in specific rideshare

    await model.ongoing_reservation.findOneAndDelete({no: no}).exec()  // remove reservation

    await model.user.updateOne({id: pax_id}, {reservation: ''});  // update user
    res.end();
}

/**
 * http get, search rideshare
 * @param {Request} req
 * @param {Response} res
 */
const search = async (req, res) => {
    var {year, month, day, hour, minute, dep, arr} = req.query;

    // construct aggregation pipeline
    const date = {
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day)
    }, pipeline = [{$match: {date: date}}];
    if (dep)
        pipeline.push({$match: {'schedule.stop': {$in: [dep]}}});
    if (arr)
        pipeline.push({$match: {'schedule.stop': {$in: [arr]}}});
    pipeline.push({$project: {_id: 0, no: 1, capacity: 1,
        schedule: 1, drv_name: 1, drv_rating: 1}});

    const result = (await model.ongoing_rideshare.aggregate(pipeline))
    .filter((r) => {
        const dep_idx = r.schedule.findIndex((s) => dep === s.stop),
            arr_idx = r.schedule.findIndex((s) => arr === s.stop);

        // check order
        if (arr_idx <= dep_idx)
            return false;

        // check time
        if (getMinute(r.schedule[dep_idx]) <
            getMinute({hour: parseInt(hour), minute: parseInt(minute)}))
            return false;

        // check capacity
        for (let idx = dep_idx; idx <= arr_idx; idx++) {
            if (r.capacity === r.schedule[idx].volume)
                return false;
        }

        return true;
    }).map((rs) => {
        const dep_idx = rs.schedule.findIndex((s) => dep === s.stop),
            arr_idx = rs.schedule.findIndex((s) => arr === s.stop);
        return {
            no: rs.no,
            drv_name: rs.drv_name,
            drv_rating: rs.drv_rating,
            fare: rs.schedule[arr_idx].accum_fare - rs.schedule[dep_idx].accum_fare,
            schedule: rs.schedule.map((s) => {
                delete s['accum_fare'];
                delete s['volume'];
                return s;
            }),
        }
    });
    res.json(result);
}

export default {
    update,
    query,
    host,
    unhost,
    reserve,
    cancel,
    search
}