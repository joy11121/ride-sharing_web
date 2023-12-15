import mongoose from "mongoose";

const dateSchema = new mongoose.Schema({
    year: {type: Number, require: true},
    month: {type: Number, require: true},
    day: {type: Number, require: true},
    // weekday: {type: Number, require: true},
}, {_id: false});

const scheduleSchema = new mongoose.Schema({
    stop: {type: String, require: true},
    hour: {type: Number, require: true},
    minute: {type: Number, require: true}
}, {_id: false});

const reservationSchema = mongoose.Schema({
    date: {type: dateSchema, require: true},
    veh_no: {type: String, require: true},
    drv_id: {type: String, require: true},
    drv_name: {type: String, require: true},
    dep: {type: scheduleSchema, require: true},
    arr: {type: scheduleSchema, require: true},
    count: {type: Number, default: 1},
    unit_fare: {type: Number, require: true},
    state: {type: Number, default: 0},
}, {_id: false});

const rideshareSchema = new mongoose.Schema({
    no: {type: String, require: true},
    date: {type: dateSchema, require: true},
    veh_no: {type: String, require: true},
    schedule: {type: [scheduleSchema], require: true},
    volume: {type: [Number], require: true},
    capacity: {type: Number, require: true},
    zone_fare: {type: [Number], require: true},

    // rsv_ids: {type: [String]},  // or rsv_name ?
    pax_cnt: {type: Number, default: 0},
    revenue: {type: Number, default: 0},
    state: {type: Number, default: 0}
}, {_id: false});

const userSchema = new mongoose.Schema({
    // basic
    id: {type: String, require: true, unique: true},
    name: {type: String, default: ''},
    title: {type: String, default: ''},
    email: {type: String, default: ''},
    gender: {type: String, default: ''},
    veh_no: {type: String, default: ''},

    // rideshare
    accum_score: {type: Number, default: 0},
    rating: {type:[Number], default: [0, 0, 0, 0, 0]},
    revenue: {type: Number, default: 0},
    rideshare: {type: rideshareSchema, default: null},
    rideshare_hist: {type: [rideshareSchema], default: []},

    // reservation
    expense: {type: Number, default: 0},
    reservation: {type: [reservationSchema], default: []},
    reservation_hist: {type: [reservationSchema], default: []},
}, {_id: false});

export default {
    userSchema,
}