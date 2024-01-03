import React from "react";
import { Routes, Route, redirect } from 'react-router-dom'
import Main from "../pages/main";
import catalog from "../pages/catalog";
import { NewsList, NewsPage } from "../pages/newslist";
import { AdminPanel, AdminDelete, AdminUpdatePage, AdminCreatePage } from "../pages/Admin"
import { Login, Logout, Register, Empty } from "../pages/Auth";
import { Reviews } from "../pages/Reviews"

const AppRouter = () => {
    return (
        <Routes >
            <Route path="/" Component={Main}></Route>
            <Route path="/catalog" Component={catalog}></Route>
            <Route path="/news" Component={NewsList}></Route>
            <Route path="/news/:id" Component={NewsPage}></Route>
            <Route path="/admin" Component={AdminPanel}></Route>
            <Route path="/admin/delete/:id" Component={AdminDelete}></Route>
            <Route path="/admin/update/:id" Component={AdminUpdatePage}></Route>
            <Route path="/login" Component={Login}></Route>
            <Route path="/logout" Component={Logout}></Route>
            <Route path="/register" Component={Register}></Route>
            <Route path="/reviews" Component={Reviews}></Route>
            <Route path="/admin/create" Component={AdminCreatePage}></Route>
        </Routes>
    );
};

export default AppRouter;
