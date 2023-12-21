import React, { useContext } from "react";
import { Context } from "../index";
import Catalog from "../components/Catalog";

const catalog = () => {
    return (
        <div>
            <h1>Каталог</h1>
            <Catalog></Catalog>
        </div>
    )
}

export default catalog;