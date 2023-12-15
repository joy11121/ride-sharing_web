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

    await model.userModel.deleteMany({});
}

export default {
    connect
};