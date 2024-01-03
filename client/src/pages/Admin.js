import React, { useContext, useEffect, useState } from "react"
import { Context } from "../index"
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";


function AdminDelete() {
    const { carsStore } = useContext(Context);
    let [isReady, setReady] = useState(false);
    let id = useParams().id;
    useEffect(() => {
        async function f() {
            await carsStore.delette(id);
            setReady(true);
        }
        f();
    }, [carsStore, id])
    if (isReady) {
        return <Navigate to="/admin" />;
    }
    else {
        return <p>Loading...</p>
    }
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

function AdminCreatePage() {
    let navigate = useNavigate();
    const { carsStore } = useContext(Context);
    let [formObj, setForm] = useState({ mark: "", type: "sedan", price: 5 })
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
        carsStore.create(formObj); //check method on carsStore
        navigate("/admin");
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
                <label for="price">Price</label>
                <input id="price" name="price" type="number" min="5" max="120" value={formObj.price} onChange={onChange} />
                <button type="button" onClick={onSubmit}>Добавить</button>
            </form >
        </div >
    )
}

function AdminPanel() {
    const { carsStore } = useContext(Context);

    let [cars, setCars] = useState(null);
    useEffect(() => {
        async function f() {
            let res = await carsStore.getCars();
            console.log(`from getcats ${JSON.stringify(res)}`)
            setCars(await carsStore.getCars());
        }

        f();
    }, [setCars, carsStore])
    // let newCar = new global.CarModel({
    //     mark: req.body.markField,
    //     priceForHour: Number(req.body.priceField),
    //     type: req.body.typeField
    // });

    if (cars != null) {
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
                        {cars.map(car => {
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
                <a href="/admin/create">Создать</a>
            </div>
        )
    }
    else {
        <p>Loading...</p>
    }

}

export { AdminPanel, AdminDelete, AdminUpdatePage, AdminCreatePage };