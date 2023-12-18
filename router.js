import express from 'express';
import api from './api/index.js';

const router = express.Router();

// welcome
router.get('/', (req, res) => {
    res.send('Welcome to the RESTful API!');
});

router.get('/query', api.query);
router.get('/search', api.search);
router.post('/update', api.update);
router.post('/host', api.host);
router.post('/unhost', api.unhost);
router.post('/reserve', api.reserve);
router.post('/cancel', api.cancel);
router.post('/complete', api.complete);
router.post('/rate', api.rate);

export default router;