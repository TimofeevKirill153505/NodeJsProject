import { useContext, useState } from "react"
import { Context } from "../index"
import { useNavigate } from "react-router-dom"

function Login() {
    let cont = useContext(Context);
    let navigate = useNavigate();
    let [formObj, setForm] = useState({ username: "", password: "" });

    function onChange(event) {
        formObj[event.target.name] = event.target.value;
        console.log(`current form ${JSON.stringify(formObj)}`);
        setForm({ ...formObj })
    }

    function onClick(event) {
        cont.userStore.auth(formObj)
        if (cont.userStore.isAuth) {
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
                <label for="username">login</label>
                <input type="text" name="username" onChange={onChange} />
                <br />
                <label for="password">password</label>
                <input type="text" name="password" onChange={onChange} />
                <button type="button" onClick={onClick}>Войти</button>
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
    let [formObj, setForm] = useState({ username: "", password: "" });

    function onChange(event) {
        formObj[event.target.name] = event.target.value;
        console.log(`current form ${JSON.stringify(formObj)}`);
        setForm({ ...formObj })
    }

    function onClick(event) {
        cont.userStore.register(formObj)
        navigate("/login");
    }
    return (
        <form method="post">
            <label for="username">login</label>
            <input type="text" name="username" onChange={onChange} />
            <br />
            <label for="password">password</label>
            <input type="text" name="password" onChange={onChange} />
            <button type="button" onClick={onClick}>Зарегистрироваться</button>
        </form>
    )
}
export { Login, Logout, Register }