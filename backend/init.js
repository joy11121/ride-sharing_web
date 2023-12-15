import httpMock from 'node-mocks-http';
import data from './data/index.js';
import api from './api/index.js';

// const base = 'http://localhost:8888';
const run = async () => {
    // mock user
    for (let user of data.user) {
        const req = httpMock.createRequest({
            body: user
        }), res = httpMock.createResponse();
        await api.update(req, res);
    }

    // mock rideshare
    for (let rideshare of data.rideshare) {
        const req = httpMock.createRequest({
            body: rideshare
        }), res = httpMock.createResponse();
        await api.host(req, res);
    }
}

export default {run};
