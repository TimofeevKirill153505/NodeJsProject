import { useParams } from "react-router-dom"
import { NewsItem, News } from "../components/NewComps"
import { useContext } from "react"
import { Context } from "../index"

const NewsList = () => {
    console.log(`In news list id=${useParams().id}`)
    const { newsStore } = useContext(Context)
    return (
        newsStore.news.map(news => {
            return (
                <NewsItem news={news}></NewsItem>
            )
        })
    )
}

const NewsPage = () => {
    console.log(`In news Page id=${useParams().id}`)
    const { newsStore } = useContext(Context)
    const { id } = useParams();
    return (
        <div>
            <h1>Новость</h1>
            <News news={newsStore.getNew(id)}></News>
        </div>
    )
}

export { NewsList, NewsPage }