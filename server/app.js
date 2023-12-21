// подключение express
const express = require("express");
// создаем объект приложения
const app = express();
global.app = app;

const hbs = require("hbs");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");


const urlencodedParser = express.urlencoded({ extended: false });

const mongoose = require("mongoose");
async function connectMongoose() {
    await mongoose.connect("mongodb://localhost:27017/NodeDataBase");
}
connectMongoose();

global.CarModel = require("./CarModel.js").model;
global.ReviewModel = require("./ReviewModel.js").model;
global.NewsModel = require("./NewsModel.js").model;
global.UserModel = require("./UserModel.js").model;

//auth reqs
const session = require('express-session'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    flash = require('connect-flash');

function checkAuth() {
    return app.use((req, res, next) => {
        if (req.user) next();
        else res.redirect('/login');
    });
}

function checkPrivelege(req, res, next) {
    if (req.user?.isAdmin) next();
    else res.redirect("/index");
}

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'you secret key' }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
extPars = express.urlencoded({ extended: true });
passport.use(
    new localStrategy(
        async (user, password, done) => {
            console.log("in local strategy");
            //global.UserModel.find({ login: user })

            if (!(await global.UserModel.find({ login: user })))
                return done(null, false, {
                    message: 'User not found',
                });
            else if (!(await global.UserModel.find({ login: user, password: password })))
                return done(null, false, {
                    message: 'Wrong password',
                });


            let usr = await global.UserModel.findOne({ login: user, password: password });
            console.log(usr)
            return done(null, { id: usr._id, login: usr.login, isAdmin: usr.isAdmin });
        })
);




const catalogController = require("./Catalog");
const reviewController = require("./ReviewController.js");
const newsController = require("./NewsController.js");
const registerController = require("./RegisterController.js");
const allCatalogController = require("./allCatalog.js");

const axios = require("axios");

// определяем обработчик для маршрута "/"
app.get("/login", (req, resp) => {
    if (req.user) {
        console.log("user out")
        req.logOut((err) => { });
    }
    resp.render("login");
});

app.post('/login', extPars, (req, resp) => {

    passport.authenticate('local', {
        successRedirect: '/index',
        failureRedirect: '/login',
        failureFlash: true,
    })(req, resp)
}
)

app.get("/", (request, response) => {
    response.redirect("/index");
});

app.get("/index", async function (request, response) {
    console.log(request.user)

    let resp1 = await axios.get("https://official-joke-api.appspot.com/random_joke");
    //console.log(res)

    let resp2 = await axios.get("https://catfact.ninja/fact");
    console.log(resp1.data.setup);
    console.log(resp2.data.fact);


    return response.render("index.hbs", { api1: resp1.data.setup + resp1.data.punchline, api2: resp2.data.fact });
    // отправляем ответ
});

app.use("/catalog", checkPrivelege);
app.use("/catalog/delete/:id", checkPrivelege);
app.use("/catalog/update/:id", checkPrivelege)


app.get("/catalog", catalogController.get);
app.get("/catalog/delete/:id", catalogController._delete);
app.post("/catalog", urlencodedParser, catalogController.post);

app.get("/catalog/update/:id", catalogController.updateGet)
app.post("/catalog/update/:id", urlencodedParser, catalogController.updatePost);

app.get("/reviews", reviewController.get);

app.get("/news", newsController.get);
app.get("/news/:id", newsController.get);

app.get("/register", registerController.get);
app.post("/register", urlencodedParser, registerController.post);

app.get("/allcatalog", allCatalogController.get)
//app.get("/react", (req, resp) => { return resp.sendFile(__dirname + "/react tries/index.html"); })

// начинаем прослушивать подключения на 3000 порту
app.listen(3000);
console.log("App is running");