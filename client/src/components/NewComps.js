import { useContext } from "react"
import { Context } from "../index";

function NewsItem(props) {
    return (
        <div>
            <p>{props.news.authorName}</p>
            <p>{props.news.newsName}</p>
            <p>{props.news.text}</p>
            <a href={"/news/" + props.news.id}> Читать</a>
            <hr />
        </div>
    )
}

function News(props) {
    return (
        <div>
            <h2>{props.news.newsName}</h2>
            <h5><i>{props.news.authorName}</i></h5>
            <p>{props.news.text}</p>
        </div>)
}

function NewsList(props) {

    const { newsStore } = useContext(Context);
    return (
        newsStore.newsStore.map(news => {
            return (
                <NewsItem news={news}></NewsItem>
            )
        })
    )
}


export { NewsItem, News }