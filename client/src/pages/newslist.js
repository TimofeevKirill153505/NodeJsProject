import { useParams } from "react-router-dom"
import { NewsItem, News } from "../components/NewComps"
import { useContext, useState, useEffect } from "react"
import { Context } from "../index"

const NewsList = () => {
    console.log("in news list")
    const { newsStore } = useContext(Context);
    let [data, setData] = useState(null);

    useEffect(() => {
        async function f() {
            let res = await newsStore.getNews();
            console.log(res);
            setData(res);
        };

        f();
    }, [newsStore])

    if (data === null) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        data.map(news => {
            return (
                <NewsItem news={news}></NewsItem>
            )
        })
    )
}

const NewsPage = () => {
    console.log(`In news Page id=${useParams().id}`)
    const { id } = useParams();
    const { newsStore } = useContext(Context);
    let [data, setData] = useState(null);

    useEffect(() => {
        async function f() {
            let res = await newsStore.getNew(id);
            console.log(res);
            setData(res);
        };

        f();
    }, [newsStore, id])

    if (data === null) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <div>
            <h1>Новость</h1>
            <News news={data}></News>
        </div>
    )
}

export { NewsList, NewsPage }