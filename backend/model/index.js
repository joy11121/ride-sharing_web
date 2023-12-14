import mongoose from "mongoose";
import schema from '../schema/index.js';

const user = mongoose.model('user', schema.user);
const ongoing_rideshare = mongoose.model('ongoing_rideshare', schema.rideshare);
const expired_rideshare = mongoose.model('expired_rideshare', schema.rideshare);
const ongoing_reservation = mongoose.model('ongoing_reservation', schema.reservation);
const expired_reservation = mongoose.model('expired_reservation', schema.reservation);

export default {
    user,
    ongoing_rideshare,
    expired_rideshare,
    ongoing_reservation,
    expired_reservation,
}

