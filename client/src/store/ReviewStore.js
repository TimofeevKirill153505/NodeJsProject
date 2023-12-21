export default class ReviewStore {
    _reviews;
    // const carScheme = new Schema({
    //     user: Number,
    //     rate: Number,
    //     text: String
    // });
    constructor() {
        this._reviews = [{ user: 1, rate: 3, text: "lajfjghb" },
        { user: 2, rate: 4, text: "lasaaaaaab" },
        { user: 3, rate: 5, text: "iwutuwryiuigh" }]
    }

    get reviews() {
        return this._reviews;
    }
}