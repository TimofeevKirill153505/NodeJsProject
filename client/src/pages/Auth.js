import { useContext, useEffect, useState } from "react"
import { Context } from "../index"
import { useNavigate } from "react-router-dom"


function Login() {
    let cont = useContext(Context);
    let navigate = useNavigate();
    let [formObj, setForm] = useState({ login: "", password: "" });

    function onChange(event) {
        formObj[event.target.name] = event.target.value;
        console.log(`current form ${JSON.stringify(formObj)}`);
        setForm({ ...formObj })
    }

    async function OnClick(event) {
        console.log("in onclick")
        let res = await cont.userStore.auth(formObj);
        console.log(`in onclick ${res}`)

        if (cont.userStore.isAuth) {
            console.log("authed")
            navigate("/");
        }
        else {
            navigate("/login")
        }
    }

    return (
        <div>
            <h1>Вход</h1>
            <form method="post">
                <label for="login">login</label>
                <input type="text" name="login" onChange={onChange} />
                <br />
                <label for="password">password</label>
                <input type="text" name="password" onChange={onChange} />
                <button type="button" onClick={OnClick}>Войти</button>
            </form>
        </div>
    )
}

function Logout() {
    let navigate = useNavigate();
    let cont = useContext(Context);
    cont.userStore.logout();
    navigate("/");
}

function Register() {
    let cont = useContext(Context);
    let navigate = useNavigate();
    let [formObj, setForm] = useState({ login: "", password: "" });

    let [currBorderPassword, setCurrBorderPassword] = useState("1px black solid");
    let [currBorderLogin, setCurrBorderLogin] = useState("1px black solid");

    function validate(str) {
        let re = /^\w{8,}$/
        return re.test(str);

    }

    function onChange(event) {
        formObj[event.target.name] = event.target.value;
        if (!validate(event.target.value)) {
            if (event.target.name == "password") {
                setCurrBorderPassword("1px red solid")
            }
            else {
                setCurrBorderLogin("1px red solid");
            }
        }
        else {
            if (event.target.name == "password") {
                setCurrBorderPassword("1px black solid")
            }
            else {
                setCurrBorderLogin("1px black solid");
            }
        }
        console.log(`current form ${JSON.stringify(formObj)}`);
        setForm({ ...formObj })
    }

    async function onClick(event) {
        if (!validate(formObj.login) || !validate(formObj.password)) return;
        let res = await cont.userStore.register(formObj);
        console.log(`from onclick in register ${res}`)
        if (cont.userStore.status === true) {
            navigate("/login");
        }
        else {
            navigate("/register");
        }
    }
    return (
        <div>
            <h1>Регистрация</h1>
            <form method="post">
                <label for="login">login</label>
                <input type="text" name="login" onChange={onChange} style={{ border: currBorderLogin }} />
                <br />
                <label for="password">password</label>
                <input type="text" name="password" onChange={onChange} style={{ border: currBorderPassword }} />
                <button type="button" onClick={onClick}>Зарегистрироваться</button>
            </form>
        </div>
    )
}
export { Login, Logout, Register }