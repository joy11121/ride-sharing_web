import mongoose from 'mongoose';
import 'dotenv-defaults/config.js';
import model from './model/index.js';

mongoose.set('strictQuery', true);

const connect = async () => {
    mongoose.connection.once('open', () => {
        console.log("Connected to MongoDB");
    });

    mongoose.connection.on('error', () => {
        console.error(error);
    })

    await mongoose.connect(process.env.MONGO_URL);

    // reset
    await model.user.deleteMany({});
    await model.ongoing.deleteMany({});
    await model.expired.deleteMany({});
}

export default {
    connect
};