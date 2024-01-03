async function get(req, resp) {
    //console.log();
    req.params["id"];
    if (req.params["id"]) {
        console.log("from get news by id")
        let ne = await global.NewsModel.findById(req.params["id"]);

        return resp.json(ne)
    }
    else {
        console.log("from get all news")
        //console.log("in get newslist" + ` ${await global.NewsModel.find({})}`);
        return resp.json(await global.NewsModel.find({}));
    }
}

exports.get = get;