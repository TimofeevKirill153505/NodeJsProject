export default class UserStore {
    // authorName: String,
    // newsName: String,
    // text: String
    _isAuth;
    _isAdmin;
    constructor() {
        console.log(`New userStore ${new Date()}`)
        this._isAuth = false;
        this._isAdmin = false;
    }

    get isAuth() {
        return this._isAuth;
    }

    get isAdmin() {
        return this._isAdmin;
    }

    auth(obj) {
        if (obj.username === "usr" && obj.password === "12345678") {
            this._isAdmin = true;
            this._isAuth = true;
        }
    }

    logout() {
        this._isAuth = false;
        this._isAdmin = false;
    }

    register(obj) {
        console.log(`register ${JSON.stringify(obj)}`)
    }

    getUserNameById(id) {
        return "User" + id;
    }
}
