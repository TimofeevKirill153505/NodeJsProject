async function get(req, resp) {
    //console.log();
    req.params["id"];
    if (req.params["id"]) {
        let ne = await global.NewsModel.findById(req.params["id"]);

        return resp.render("newsPage", { ne: ne })
    }
    else {
        console.log("in get newslist" + ` ${await global.NewsModel.find({})}`);
        return resp.render("newsList.hbs", {
            newsList: await global.NewsModel.find({})
        });
    }
}

exports.get = get;