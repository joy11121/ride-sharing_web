import { v4 as uuidv4 } from "uuid";

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

const rideshare = [
    {
        year: 2023,
        month: 12,
        day: 12,
        drv_id: '0000',
        veh_no: '0000',
        capacity: 3,
        price: 900,

        schedule:[
            {stop: 'A', hour: 10, minute: 0},
            {stop: 'C', hour: 10, minute: 10},
            {stop: 'E', hour: 10, minute: 30},
        ]
    }, {
        year: 2023,
        month: 12,
        day: 12,
        drv_id: '0001',
        vehicle: '0001',
        capacity: 6,
        price: 10000,

        schedule:[
            {stop: 'A', hour: 22, minute: 10},
            {stop: 'B', hour: 22, minute: 20},
            {stop: 'C', hour: 22, minute: 30},
            {stop: 'D', hour: 22, minute: 50},
        ]
    }
]

export default {
    user,
    rideshare
};