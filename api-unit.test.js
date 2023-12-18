import httpMock from 'node-mocks-http';
import api from './api/index.js';
import init  from './init.js'
import dayjs from 'dayjs';
import { log } from 'console';
import mongo from './mongo.js';
import mongoose from 'mongoose';

const {$y, $M, $D, $H, $m} = dayjs(); 
const positionList = [
    [24.779046663607577, 120.99319338810972, '台積電7廠'],
    [24.797820970001588, 120.9965950914603, '清華大學'],
    [24.827501310697876, 120.91150582121116, '廢物媽媽育兒農場'],
    [24.817616, 121.025921, '六家庄'],
    [24.821205, 121.181797, '六福村'],
    [24.705444, 121.182472, '內灣車站'],
    [24.800222, 120.978194, '新竹孔廟'],
];

describe('API Unit Tests', () => {

  describe('query', () => {
    test('should return user data', async () => {
      
      const req = httpMock.createRequest({
        method: 'GET',
        url: '/query',
        query: { id: '0000' },
      });
      const res = httpMock.createResponse();

      await mongo.connect();
      await init.run();
      await api.query(req, res);

      const responseData = JSON.parse(res._getData());
      expect(responseData.id).toEqual("0000");
      expect(responseData.name).toEqual("uu");
      expect(responseData.reservation.length).toEqual(0);
      expect(responseData.rideshare.schedule.length).toEqual(4);
      expect(responseData.rideshare.date).toEqual({ year: $y, month: $M + 1, day: $D });

    });

  });

  describe('search', () => {
    test('should return user data', async () => {
      const req = httpMock.createRequest({
        method: 'GET',
        url: '/search',
        query: { 
            year: $y, month: $M + 1, day: $D,
            hour: $H, minute: $m, 
            departure:positionList[0][2], arrival:positionList[2][2],
            count: 1,
        },
      });
      const res = httpMock.createResponse();

      await init.run();
      await api.query(req, res);

      const responseData = JSON.parse(res._getData());
      if(responseData && responseData.length){
        for(let i = 0; i < responseData.length; i++){
          const dep = responseData[i].schedule.find((s) => myPos === s.stop);
          const arr = responseData[i].schedule.find((s) => myDest === s.stop);
          expect(dep).not.toBeNull();
          expect(arr).not.toBeNull();
          expect(dep.hour).toEqual($H);
          expect(dep.minute).toEqual($m);
        }
      }
      
      await mongoose.connection.close()
    });
  });

  // Add similar tests for other endpoints (unhost, reserve, cancel, search)
});

