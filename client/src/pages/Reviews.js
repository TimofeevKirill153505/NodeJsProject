import { Component, useContext, useEffect, useState } from "react";
import { Context } from "../index";

class Review extends Component {
    render() {

        return (
            <div>
                <h3>{this.props.username}</h3>
                <i> {this.props.review.rate} / 5</i>
                <p>{this.props.review.text}</p>
                <hr />
            </div>
        );
    }
}

function Reviews() {
    const { reviewStore } = useContext(Context);
    let [data, setData] = useState(null);
    useEffect(() => {
        async function f() {
            let res = await reviewStore.getReviews();
            console.log(res);
            setData(res);
        };

        f();
    }, [reviewStore])

    if (data === null) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <div>
            {
                data.map((review) => {
                    return <Review review={review} username={review.username}></Review>;
                })
            }
        </div>
    )
}

export { Reviews }