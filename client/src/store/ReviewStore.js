import axios from 'axios';

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

    async getReviews() {
        let res = await axios.get("http://localhost:3001/reviews")
        console.log(res.data)
        return res.data;
    }
}