import {v4 as uuidv4} from 'uuid';
import model from '../model/index.js';

/**
 * http post, signup a new user
 * @param {Request} req 
 * @param {Response} res 
 */
const signup = async (req, res) => {
    const body = req.body, id = body.id;
    await model.user.insertMany([body]);
    res.end();
}

/**
 * http post, update existing user's information
 * @param {Request} req
 * @param {Response} res
 */
const update = async (req, res) => {
    const body = req.body, id = body.id;
    await model.user.updateOne({id}, body).exec();
    res.end();
}

/**
 * http get, query user's information (with specified fields?)
 * @param {Request} req 
 * @param {Response} res 
 */
const query = async (req, res) => {
    const {id} = req.query;
    const user = await model.user.findOne({id}, {_id: 0, __v: 0,}).exec();

    if (user === null) {    // signup if doesn't exist
        await model.user.insertMany([{id}]);
        res.json({id});
        return;
    }

    if (user.rideshare !== '') {
        user.rideshare = await model.ongoing_rideshare.findOne(
            {no: user.rideshare},   // matching
            {_id: 0, __v: 0, drv_id: 0, reservation: 0} // projection
        ).exec();
    } else if (user.reservation !== '') {
        user.reservation = await model.ongoing_reservation.findOne(
            {no: user.reservation}, // matching
            {_id: 0, __v: 0, rideshare: 0, pax_id: 0, dep_idx: 0, arr_idx: 0}   // projection
        ).exec();
    }

    if (user.history.rideshare.length) {
        user.history.rideshare = await model.ongoing_rideshare.aggregate([
            {$match: {no: {$in: user.history.rideshare}}},
            {$project: {_id: 0, __v: 0, drv_id: 0, reservation: 0}},
        ])
    }

    if (user.history.reservation.length) {
        user.history.reservation = await model.ongoing_reservation.aggregate([
            {$match: {no: {$in: user.history.reservation}}},
            {$project: {_id: 0, __v: 0, rideshare: 0, pax_id: 0, dep_idx: 0, arr_idx: 0}},
        ])
    }

    res.json(user);
}

/**
 * transfer {hour, minute, ...} to minute
 * @param {Number} time.hour
 * @param {Number} time.minute
 * @returns {Number}
 */
const getMinute = (time) => {
    return 60 * time.hour + time.minute;
}

/**
 * http post, host a new rideshare
 * @param {Request} req
 * @param {Response} res
 */
const host = async (req, res) => {
    const {
        price,
        drv_id,
        schedule,   // stop, hour, minute

        date,   // year, month, day (required but not used)
        veh_no, // required but not used
        capacity,   // required but not used
        drv_name,   // required but not used
        drv_rating, // required but not used
    } = req.body;
    req.body.no = uuidv4();
    req.body.no = drv_id;   // only for testing

    // calculate zone fares
    const k = schedule.length - 1, base = getMinute(schedule[0]),
        intv = getMinute(schedule[k]) - base;
    for (let i = 0; i <= k; i++)
        schedule[i].accum_fare = price * ((getMinute(schedule[i]) - base) / intv);

    await model.ongoing_rideshare.insertMany([req.body]);   // insert rideshare
    await model.user.updateOne(
        {id: drv_id},
        {rideshare: {no: req.body.no, status: 0}}
    ).exec();  // update driver
    res.end();
}

/**
 * http post, unhost a existing rideshare
 * @param {Request} req
 * @param {Response} res
 */
const unhost = async(req, res) => {
    const {no} = req.body;

    const {drv_id, count} = (await model.ongoing_rideshare.aggregate([
        {$match: {no: no}},
        {$project: {_id: 0, drv_id: 1, count: {$size: '$reservation'}}}
    ]))[0];

    if (count) {    // has been reserved
        res.send(`TOO LAAAAATE`);
        return;
    }

    await model.ongoing_rideshare.deleteOne({no}).exec();   // delete rideshare
    await model.user.updateOne({id: drv_id}, {rideshare: null}).exec();  // update driver
    res.end();
}

/**
 * http post, reserve a rideshare
 * @param {Request} req
 * @param {Response} res
 */
const reserve = async (req, res) => {
    const {
        no,
        dep,
        arr,
        pax_id,
    } = req.body;

    const {
        veh_no,
        drv_name,
        capacity,
        date,
        schedule,
    } = await model.ongoing_rideshare.findOne({no}, {
        _id: 0,
        __v: 0,
        no: 0,
        price: 0,
        drv_id: 0,
    }).exec();

    // check date
    const deadline = new Date(
        date.year, date.month - 1, date.day, schedule[0].hour, schedule[0].minute);
    if (deadline.getTime() < Date.now()) {
        res.send('TOO LAAAAATE');
        return;
    }

    // check capacity
    const dep_idx = await schedule.findIndex((s) => dep === s.stop),
        arr_idx = await schedule.findIndex((s) => arr === s.stop);

    for (let idx = dep_idx; idx <= arr_idx; idx++) {
        if (capacity === schedule[idx].volume) {
            res.send('FUUUUULL');
            return;
        }
    }

    for (let idx = dep_idx; idx <= arr_idx; idx++)
        schedule[idx].volume++;

    // construct reservation
    const reservation = {
        no: uuidv4(),
        veh_no: veh_no,
        drv_name: drv_name,
        date: date,
        dep: {
            stop: schedule[dep_idx].stop,
            hour: schedule[dep_idx].hour,
            minute: schedule[dep_idx].minute,
        },
        arr: {
            stop: schedule[arr_idx].stop,
            hour: schedule[arr_idx].hour,
            minute: schedule[arr_idx].minute,
        },
        fare: schedule[arr_idx].accum_fare - schedule[dep_idx].accum_fare,

        rideshare: no,
        pax_id: pax_id,
        dep_idx: dep_idx,
        arr_idx: arr_idx,
    };

    await model.ongoing_reservation.insertMany([reservation]);   // insert reservation

    await model.ongoing_rideshare.updateOne(
        {no},   // rideshare no
        {
            schedule: schedule,
            $push: {reservation: reservation.no},
        }
    ).exec();   // update rideshare

    await model.user.updateOne(
        {id: pax_id},
        {reservation: {no: reservation.no, status: 0}}
    ).exec();  // update passenger
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

    await model.user.updateOne({id: pax_id}, {reservation: null});  // update user
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
            dep: {
                hour: rs.schedule[dep_idx].hour,
                minute: rs.schedule[dep_idx].minute,
            },
            arr: {
                hour: rs.schedule[arr_idx].hour,
                minute: rs.schedule[arr_idx].minute,
            },
            fare: rs.schedule[arr_idx].accum_fare- 
                rs.schedule[dep_idx].accum_fare,
        }
    });
    res.json(result);
}

export default {
    signup,
    update,
    query,
    host,
    unhost,
    reserve,
    cancel,
    search
}