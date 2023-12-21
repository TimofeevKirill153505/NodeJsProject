async function get(req, resp) {
    resp.render("register");
}

async function post(req, resp) {
    let obj = { login: req.body.login, password: req.body.password }
    console.log(obj)
    console.log(await global.UserModel.find({ login: obj.login }))
    if ((await global.UserModel.find({ login: obj.login })).length != 0) {
        console.log("найден юзер с таким логином")
        return resp.redirect("/register");
    }
    console.log("cсоздается юзер")
    let usr = new global.UserModel({
        login: obj.login,
        password: obj.password,
        isAdmin: false
    });

    usr.save();
    return resp.redirect("/login");
}

exports.get = get;
exports.post = post;