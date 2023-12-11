import mongoose from "mongoose";
import schema from '../schema/index.js';

const user = mongoose.model('user', schema.user);
const ongoing = mongoose.model('ongoing', schema.rideshare);
const expired = mongoose.model('expired', schema.rideshare);

export default {
    user,
    ongoing,
    expired
}

