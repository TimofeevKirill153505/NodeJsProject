import React, { useContext, useState } from "react"
import { Context } from "../index"
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";


function AdminDelete() {
    const { carsStore } = useContext(Context);
    carsStore.delette(useParams().id)
    return <Navigate to="/admin" />;
}

function AdminUpdatePage() {
    let id = useParams().id;
    let navigate = useNavigate();
    const { carsStore } = useContext(Context);
    let car = carsStore.getCarById(id)
    let [formObj, setForm] = useState({ ...car })
    console.log(`current form from Func ${JSON.stringify(formObj)}`);

    const onChange = (event) => {
        console.log(`target name ${event.target.name}`);
        console.log(`target value ${event.target.value}`);
        formObj[event.target.name] = event.target.value;
        setForm({ ...formObj });

        console.log(`current form ${JSON.stringify(formObj)}`);
    }

    const onSubmit = (event) => {
        console.log(`current form for submit ${JSON.stringify(formObj)}`);
        navigate("/admin");
        carsStore.update(formObj);
    }

    return (
        <div>
            <form>
                <label for="mark">Mark</label>
                <input id="mark" name="mark" type="text" value={formObj.mark} onChange={onChange} />
                <br />
                <label for="type">Type</label>
                <select id="type" name="type" onChange={onChange}>
                    <option value="sedan" selected={formObj.type === "sedan" ? "selected" : ""}>Sedan</option>
                    <option value="coupe" selected={formObj.type === "coupe" ? "selected" : ""}>Coupe</option>
                    <option value="universal" selected={formObj.type === "universal" ? "selected" : ""}>Universal</option>
                </select >
                <label for="priceForHour">Price</label>
                <input id="price" name="priceForHour" type="number" min="5" max="120" value={formObj.priceForHour} onChange={onChange} />
                <button type="button" onClick={onSubmit}>Добавить</button>
            </form >
        </div >
    )
}

// function ClickButtonHook(props) {
//     const [count, setCount] = useState(0);
//     const press = function () {
//         setCount(count + props.increment);
//     };
//     return (<div>
//         <button onClick={press}>Count</button>
//         <div>Counter: {count}<br /> Increment: {props.increment}</div>
//     </div>);
// }

// return (
//     <ClickButtonHook increment={2}></ClickButtonHook>
// )
// }

function AdminPanel() {
    const { carsStore } = useContext(Context);
    return (
        <div>
            <h1>Admin</h1>
            <table>
                <tbody>
                    <tr>
                        <td>mark</td>
                        <td>type</td>
                        <td>price for hour</td>
                    </tr>
                    {carsStore.cars.map(car => {
                        return (
                            <tr>
                                <td>{car.mark}</td>
                                <td>{car.type}</td>
                                <td>{car.priceForHour}</td>
                                <td><a href={"/admin/update/" + car._id}>редактировать</a></td>
                                <td>
                                    <a href={"/admin/delete/" + car._id}>удалить</a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}

export { AdminPanel, AdminDelete, AdminUpdatePage };