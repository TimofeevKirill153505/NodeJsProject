import { NavLink } from "react-router-dom";
import { Context } from "../index";
import { useContext } from "react";

import "../style.css"


function NavBar() {
    let cont = useContext(Context);
    if (cont.userStore.isAuth) {
        if (cont.userStore.isAdmin) {
            console.log("authed as admin")
            return (
                <nav class="nav">
                    <a href="/"> Главная </a>
                    <a href="/catalog"> Каталог </a>
                    <a href="/news"> Новости </a>
                    <a href="/reviews"> Отзывы </a>
                    <a href="/admin"> Админ </a>
                    <a href="/logout"> выход </a>
                </nav>
            )
        }
        else {
            console.log("authed as user");
            return (
                <nav class="nav">
                    <a href="/"> Главная </a>
                    <a href="/catalog"> Каталог </a>
                    <a href="/news"> Новости </a>
                    <a href="/reviews"> Отзывы </a>
                    <a href="/logout"> выход </a>
                </nav>
            )
        }
    }
    else {
        console.log("not authed");
        return (
            <nav class="nav">
                <a href="/"> Главная </a>
                <a href="/catalog"> Каталог</a>
                <a href="/news"> Новости </a>
                <a href="/reviews"> Отзывы </a>
                <a href="/login"> Вход </a>
                <a href="/register"> Регистрация </a>
            </nav>
        )
    }
}

export default NavBar;