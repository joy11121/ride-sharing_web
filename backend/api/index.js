import {v4 as uuidv4} from 'uuid';
import model from '../model/index.js';

const update = async (req, res) => {
    await model.user.updateOne({id: req.body.id}, req.body, {upsert: true}).exec();
    res.end();
}

const query = async (req, res) => {
    const {id} = req.body;
    const user = (await model.user.aggregate([
        {$match: {id: id}}, {$project: {_id: 0, __v: 0}}
    ]))[0];

    if (user.host_no !== '') {
        user.hosting = (await model.ongoing.aggregate([
            {$match: {no: user.host_no}}, {$project: {_id: 0, __v: 0}}
        ]))[0];
    } else if (user.rsv !== '') {
        const {_id, schedule, reserved} = (await model.ongoing.aggregate([
            {$match: {no: user.rsv_no}},
            {$project: {schedule: 1, reserved: 1}}
        ]))[0];

        var dep_idx = 0, arr_idx = 0;
        for (var r of reserved) {
            if (r.pax_id == id) {
                dep_idx = r.dep_idx;
                arr_idx = r.arr_idx;
                break;
            }
        }

        user.reservation = {
            no: user.rsv,
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
            fare: schedule[arr_idx].accum_fare - schedule[dep_idx].accum_fare
        }
    }

    res.json(user);
}

const host = async (req, res) => {
    const {
        price,
        drv_id,
        schedule,   // stop, hour, minute
    } = req.body;
    req.body.no = uuidv4();
    req.body.no = drv_id;

    const k = schedule.length - 1,
        base = 60 * schedule[0].hour + schedule[0].minute,
        intv = (60 * schedule[k].hour + schedule[k].minute) - base;

    for (let i = 0; i <= k; i++) {
        schedule[i].accum_fare = price / intv *
            ((60 * schedule[i].hour + schedule[i].minute) - base);
    }

    // update driver
    await model.user.updateOne({id: drv_id}, {host_no: req.body.no}).exec();
    // insert rideshare
    await model.ongoing.insertMany([req.body]);
    res.end();
}

const unhost = async(req, res) => {
    // await model.ongoing.deleteOne({no: req.body.no});
    // await model.user.updateOne({id: req.body.drv_id}, {drv_no: ""});
    // res.end();
}

const reserve = async (req, res) => {
    // frontend
    const {no, pax_id, dep, arr} = req.body;
    // database
    const {capacity, schedule} = await model.ongoing.findOne({no: no}, "capacity schedule").exec();

    const dep_idx = await schedule.findIndex((s) => s.stop === dep),
        arr_idx = await schedule.findIndex((s) => s.stop === arr);

    for (let idx = dep_idx; idx <= arr_idx; idx++) {
        if (capacity === schedule[idx].volume) {
            res.send('Full').end();
            return;
        }
    }

    for (let idx = dep_idx; idx <= arr_idx; idx++)
        schedule[idx].volume += 1;

    await model.ongoing.updateOne({no: no},
        {
            schedule: schedule,
            $push: {reserved: {
                pax_id: pax_id,
                dep_idx: dep_idx,
                arr_idx: arr_idx,
                fare: schedule[arr_idx].accum_fare - schedule[dep_idx].accum_fare,
            }}
        }
    ).exec();

    await model.user.updateOne({id: pax_id}, {rsv_no: no}).exec();
    res.send(`Successful`).end();
}

const cancel = async (req, res) => {
    const {no, id} = req.body;
    const {year, month, day, schedule} = (await model.ongoing.aggregate([
        {$match: {no: no}},
        {$project: {year: 1, month: 1, day: 1, schedule: 1}}
    ]))[0];

    const deadline = new Date(year, month - 1, day, schedule[0].hour, schedule[0].minute);
    // check
    if (deadline.getTime() <= Date.now()) {
        res.send(`TOO LAAAAATE`);
        return;
    }

    // cancel
    const reserved = (await model.ongoing.aggregate([
        {$match: {no: no}},
        {$project: {reserved: 1}}
    ]))[0].reserved.filter((r) => {return r.pax_id == id})[0];

    const {dep_idx, arr_idx} = reserved;
    for (var idx = dep_idx; idx <= arr_idx; idx++)
        schedule[idx].volume -= 1;
    await model.ongoing.updateOne({no: no}, {schedule: schedule}).exec();
    await model.ongoing.updateOne({no: no}, {$pull: {reserved: reserved}}).exec();
    res.send(`Successful`).end();
}

const search = async (req, res) => {
    const {year, month, day, hour, minute, departure, arrival} = req.body;
    console.log(hour, minute)
    const rideshares = (await model.ongoing.aggregate([
        {$match: {year: year}},
        {$match: {month: month}},
        {$match: {day: day}},
        {$match: {'schedule.stop': {$in : [departure]}}},
        {$match: {'schedule.stop': {$in : [arrival]}}},
        {$project: {no: 1, drv_id: 1, capacity: 1, schedule: 1}},
    ])).filter((rideshare) => {
        const dep_idx = rideshare.schedule.findIndex((s) => s.stop === departure),
            arr_idx = rideshare.schedule.findIndex((s) => s.stop === arrival);

        // Too Late
        const schedule = rideshare.schedule;
        if (schedule[dep_idx].hour * 60 +  schedule[dep_idx].minute <
                hour * 60 + minute) {
            return false;
        }

        if (arr_idx <= dep_idx)
            return false;
        // Full
        for (let idx = dep_idx; idx <= arr_idx; idx++) {
            if (rideshare.capacity === rideshare.schedule[idx].volume)
                return false;
        }
        return true;
    }).map((rideshare) => {
        const dep_idx = rideshare.schedule.findIndex((s) => s.stop === departure),
            arr_idx = rideshare.schedule.findIndex((s) => s.stop === arrival);

        return {
            no: rideshare.no,
            drv_id: rideshare.drv_id,
            dep_hour: rideshare.schedule[dep_idx].hour,
            dep_minute: rideshare.schedule[dep_idx].minute,
            arr_hour: rideshare.schedule[arr_idx].hour,
            arr_minute: rideshare.schedule[arr_idx].minute,
            fare: rideshare.schedule[arr_idx].accum_fare - 
                rideshare.schedule[dep_idx].accum_fare
        }
    });

    res.send(rideshares);
}

export default {
    query,
    update,
    host,
    unhost,
    reserve,
    cancel,
    search
}