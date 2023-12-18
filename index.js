import express from 'express';
import router from './router.js';
import mongo from './mongo.js';
import init from './init.js';
import cors from 'cors';

await mongo.connect();
await init.run();

const app = express();
app.use(cors());

const port = process.env.PORT || 8888; 

app.use(express.json());
app.use('/', router);
app.listen(port, () => {
    console.log('Server is running on port 8888');
});
