import mongoose from "mongoose";

const user = new mongoose.Schema(
    {
        id: {type: String, require: true, unique: true},
        name: {type: String, default: ''},
        title: {type: String, default: ''},
        email: {type: String, default: ''},
        gender: {type: String, default: ''},
        veh_no: {type: String, default: ''},
        earn: {type: Number, default: 0},
        cost: {type: Number, default: 0},

        rsv_no: {type: String, default: ''},
        host_no: {type: String, default: ''},
        rsv_hist: [{type: [String], default: []}],
        host_hist: [{type: [String], default: []}],
        rsv_rating: {type: [Number], default: [0, 0, 0, 0, 0]},
        host_rating: {type: [Number], default: [0, 0, 0, 0, 0]}
    },
    {
        _id: false
    }
);

const rideshare = new mongoose.Schema(
    {
        no: {type: String, require: true, unique: true},    // generate by backend
        year: {type: Number, require: true},
        month: {type: Number, require: true},
        day: {type: Number, require: true},
        drv_id: {type: String, require: true},
        veh_no: {type: String, require: true},
        capacity: {type: Number, require: true},
        price: {type: Number, require: true},

        schedule:{type: [{
            stop: {type: String, require: true},
            hour: {type: Number, require: true},
            minute: {type: Number, require: true},
            accum_fare: {type: Number, require: true},
            volume: {type: Number, default: 0},
        }], required: true},

        reserved: {type: [{
            pax_id: {type: String, require: true},
            dep_idx: {type: Number, require: true},
            arr_idx: {type: Number, require: true},
            fare: {type: Number, require: true}
        }]},
    }, 
    {
        _id: false
    }
);

export default {
    user,
    rideshare
}