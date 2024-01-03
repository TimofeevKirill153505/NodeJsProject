import axios from 'axios';

export default class NewsStore {
    // authorName: String,
    // newsName: String,
    // text: String
    _news;
    constructor() {
        this._news = [{ id: 1, authorName: "author", newsName: "newsName", text: "asasasa" },
        { id: 2, authorName: "author2", newsName: "newsName2", text: "asasasa1" },
        { id: 3, authorName: "author3", newsName: "newsName3", text: "asasasa2" },
        ]
    }

    async getNews() {
        let res = await axios.get("http://localhost:3001/news")
        console.log(res.data)
        return res.data;
    }

    async getNew(id) {
        let res = await axios.get(`http://localhost:3001/news/${id}`)
        console.log(res.data)
        return res.data;
    }
}