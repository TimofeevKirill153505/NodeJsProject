

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

    get cars() {
        return this._cars;
    }

    getCarById(id) {
        return this._cars[id - 1];
    }

    delette(id) {
        console.log(`item ${id} is deleted`);
    }

    update(obj) {
        console.log(`in update where form is ${JSON.stringify(obj)}`)
    }
}