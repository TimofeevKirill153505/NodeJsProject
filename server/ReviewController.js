async function get(req, resp) {
    let reviewModels = [];
    reviewModels = await global.ReviewModel.find({});

    let lst = [];
    for (rev of reviewModels) {
        console.log(`rev.usrId ${JSON.stringify(rev)}`)
        let usr = await global.UserModel.findById(rev.user)
        lst.push({ username: usr.login, rate: rev.rate, text: rev.text })
    }
    //console.log(carModels)
    return resp.json(lst);
}

exports.get = get;