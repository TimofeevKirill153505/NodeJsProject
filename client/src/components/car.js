function Car(props) {
    return (
        <div>
            <p>{props.car.mark}</p>
            <p>{props.car.type}</p>
            <p>{props.car.priceForHour}</p>
            <hr />
        </div>
    )
}

export default Car;