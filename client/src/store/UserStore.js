import axios from 'axios';
import * as jose from 'jose';

export default class UserStore {
    // authorName: String,
    // newsName: String,
    // text: String
    _isAuth;
    _isAdmin;
    status;
    constructor() {
        console.log(`New userStore ${new Date()}`)
        this._isAuth = false;
        this._isAdmin = false;
    }

    get isAuth() {
        let token = localStorage.getItem("token");
        console.log(token !== "null");
        console.log(`is Admin ${localStorage.getItem("tokenDecrypted").isAdmin}`)
        if (token !== "null") return true;
        return false;
    }

    get isAdmin() {
        if (!this.isAuth) return false;


        return localStorage.getItem("tokenIsAdmin") == "true";
    }


    logout() {
        localStorage.setItem("token", null);
        localStorage.setItem("tokenDecrypted", null);
    }

    async auth(obj) {
        let res = await axios.post("http://localhost:3001/login", {
            data: {
                ...obj
            }
        })
        if (res.status == 401) return;
        const secret = new TextEncoder().encode(
            'my very secret secret',
        )
        console.log(JSON.stringify(res))
        let payload = await jose.jwtVerify(res.data.token, secret);
        console.log(`payload ${JSON.stringify(payload)}`);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('tokenLogin', payload.payload.login);
        localStorage.setItem('tokenIsAdmin', payload.payload.isAdmin);

        //let res1 = await axios.post("http://localhost:3001/logout");
        console.log("end of auth");
        return 1;
    }

    async register(obj) {
        console.log(`register ${JSON.stringify(obj)}`)
        let res = await axios.post("http://localhost:3001/register", {
            ...obj
        })
        console.log(`res of create user ${JSON.stringify(res)}`)

        if (res.status !== 200) this.status = false;
        else this.status = true;
    }

    async getNameById(id) {
        let res = await axios.get(`http://localhost:3001/users/${id}`)

        console.log(res.data);
        return res;
    }
}
