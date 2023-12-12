import express from 'express';
import router from './router.js';
import mongo from './mongo.js';
import init from './init.js';
import cors from 'cors';

await mongo.connect();
await init.run();

const app = express();
app.use(cors());

app.use(express.json());
app.use('/', router);
app.listen(8888, () => {
    console.log('Server is running on port 8888');
});
