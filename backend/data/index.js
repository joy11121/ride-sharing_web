import { v4 as uuidv4 } from "uuid";
import dayjs from 'dayjs';

const user = [
    {
        "id": "0000",
        "name": "uu",
        "title": "milk manager",
        "email": "uu@ktwlab.com",
        "gender": "female",
        "veh_no": "0000",

    }, {
        "id": "0001",
        "name": "benny",
        "title": "milk deliver",
        "email": "benny@ktwlab.com",
        "gender": "male",
        "veh_no": "0001",
    }, {
        "id": "0002",
        "name": "jim",
        "title": "cellist",
        "email": "jim@sdlab.com",
        "gender": "male",
        "veh_no": "0002",
    }, {
        "id": "0003",
        "name": "chen",
        "title": "milk deliver",
        "email": "chen@ktwlab.com",
        "gender": "male",
        "veh_no": "0003",
    }, {
        "id": "0004",
        "name": "davidjr",
        "title": "milk deliver",
        "email": "davidjr@ktwlab.com",
        "gender": "male",
        "veh_no": "0004",
    }, 
];

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

const rideshare = [
    {
        year: $y,
        month: $M + 1,
        day: $D,
        drv_id: '0000',
        veh_no: '0000',
        capacity: 3,
        price: 900,

        schedule:[
            {stop: positionList[0][2], hour: 23, minute: 0},
            {stop: positionList[1][2], hour: 23, minute: 10},
            {stop: positionList[2][2], hour: 23, minute: 30},
        ]
    }, {
        year: $y,
        month: $M + 1,
        day: $D,
        drv_id: '0001',
        vehicle: '0001',
        capacity: 6,
        price: 10000,

        schedule:[
            {stop: positionList[0][2], hour: 23, minute: 10},
            {stop: positionList[2][2], hour: 23, minute: 20},
            {stop: positionList[3][2], hour: 23, minute: 30},
            {stop: positionList[5][2], hour: 23, minute: 50},
        ]
    },
    {
        year: $y,
        month: $M + 1,
        day: $D,
        drv_id: '0001',
        vehicle: '0001',
        capacity: 6,
        price: 10000,

        schedule:[
            {stop: positionList[0][2], hour: 23, minute: 10},
            {stop: positionList[1][2], hour: 23, minute: 20},
            {stop: positionList[4][2], hour: 23, minute: 30},
            {stop: positionList[6][2], hour: 23, minute: 50},
        ]
    }
]

export default {
    user,
    rideshare
};