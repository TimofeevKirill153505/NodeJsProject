import axios from 'axios';

export default class CarsStore {
    // mark: String,
    // type: String,
    // priceForHour: Number
    _cars;
    constructor() {
        this._cars = [{ _id: 1, mark: "mark", type: "sedan", priceForHour: 13 },
        { _id: 2, mark: "mark2", type: "coupe", priceForHour: 14 },
        { _id: 3, mark: "mark3", type: "universal", priceForHour: 15 },
        { _id: 4, mark: "mark4", type: "coupe", priceForHour: 16 }]
    }
    _res;
    async getCars() {
        // res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
        // res.header(
        //     'Access-Control-Allow-Headers',
        //     'Origin, X-Requested-With, Content-Type, Accept'
        // );

        let res = await axios.get("http://localhost:3001/allcatalog");

        console.log(res);

        return res.data;
    }

    get cars() {
        // this._getCars();
        // console.log("from request");
        // console.log(this._res.data)
        // return this._cars;
    }

    getCarById(id) {
        return this._cars[id - 1];
    }

    async delette(id) {
        let res = await axios.get(`http://localhost:3001/catalog/delete/${id}`)
        console.log(`item ${id} is deleted. res is ${JSON.stringify(res)}`);
    }

    update(obj) {
        console.log(`in update where form is ${JSON.stringify(obj)}`)
    }

    async create(obj) {
        let res = await axios.post("http://localhost:3001/catalog", {
            ...obj
        })

        console.log(`after create res is ${JSON.stringify(res)}`);
    }
}