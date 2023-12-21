import { Component, useContext } from "react";
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
    let cont = useContext(Context);

    return (
        <div>
            {
                cont.reviewStore.reviews.map((review) => {
                    return <Review review={review} username={cont.userStore.getUserNameById(review.user)}></Review>;
                })
            }
        </div>
    )
}

export { Reviews }