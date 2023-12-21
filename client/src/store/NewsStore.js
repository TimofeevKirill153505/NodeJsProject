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

    get news() {
        return this._news;
    }

    getNew(id) {
        return this.news[id];
    }
}