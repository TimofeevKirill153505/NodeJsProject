import React, { useContext } from "react";
import { Context } from "../index";
import Car from "./car"

function Catalog() {
    const { carsStore } = useContext(Context);
    return (
        carsStore.cars.map(car => {
            return (
                <Car car={car}></Car>
            )
        })
    )

}

export default Catalog;