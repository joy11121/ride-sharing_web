import mongoose from "mongoose";
import schema from '../schema/index.js';

const userModel = mongoose.model('user', schema.userSchema);

export default {
    userModel,
}

