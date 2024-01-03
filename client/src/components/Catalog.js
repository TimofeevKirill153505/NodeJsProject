import React, { useContext, useEffect, useState } from "react";
import { Context } from "../index";
import { Suspense } from "react";
import Car from "./car"
import "../style.css"

function Catalog() {
    let [data, setData] = useState(null);
    let [currData, setCurrData] = useState(null)
    const { carsStore } = useContext(Context);

    useEffect(() => {
        async function f() {
            let res = await carsStore.getCars();
            console.log(res.length)
            let lst = []
            for (let el of res) {
                lst.push({ ...el })
            }
            setData(lst);
            setCurrData(lst);
        }
        f();
    }, [carsStore]
    );

    function onSearchChanged(event) {
        console.log(event.target.value);
        let str = event.target.value;

        if (str === "") return setCurrData(data);

        var lst = [];
        for (let car of data) {
            console.log(JSON.stringify(car))
            for (let prop in car) {
                console.log(`propname: ${prop} propvalue: ${String(car[prop])}`)
                if (String(car[prop]).includes(str)) {
                    lst.push(car);
                    break;
                }
            }
        }

        setCurrData(lst);
    }

    function onSortChanged(event) {
        let str = event.target.value;
        if (str == "none") {
            setCurrData([...data])
            return;
        };

        function sorty(prop) {
            let lst = [...currData];
            console.log("on sort changed")
            for (let i = 0; i < lst.length; ++i) {
                for (let j = 0; j < (lst.length - i - 1); j++) {

                    // Checking if the item at present iteration 
                    // is greater than the next iteration
                    if (lst[j][prop] > lst[j + 1][prop]) {

                        // If the condition is true
                        // then swap them
                        var temp = lst[j]
                        lst[j] = lst[j + 1]
                        lst[j + 1] = temp
                    }
                }
            }
            return lst;
        }
        setCurrData(sorty(str));
    }

    if (currData == null) {
        return (
            <p>Loading</p>
        )
    }
    return (
        <div>
            <input type="text" onChange={onSearchChanged}></input>
            <select onChange={onSortChanged}>
                <option value="none" selected>Без сортировки</option>
                <option value="priceForHour"> По цене</option>
                <option value="type">По типу кузова</option>
                <option value="mark">По марке</option>
            </select>
            <div class="catalog-grid">

                {currData.map(car => {
                    return (

                        <Car car={car}></Car>

                    )
                })}
            </div>
        </div>
    )

}


export default Catalog;