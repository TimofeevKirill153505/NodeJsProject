// подключение express
const express = require("express");
const jwt = require("jsonwebtoken");
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
    JwtStrategy = require('passport-jwt').Strategy,
    jwtFromRequest = require('passport-jwt').ExtractJwt,
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
app.use(session({ secret: 'my very secret secret' }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
extPars = express.urlencoded({ extended: true });
// passport.use(
//     new localStrategy(
//         async (user, password, done) => {
//             //console.log("in local strategy");
//             //global.UserModel.find({ login: user })
//             console.log("in ls")
//             if (!(await global.UserModel.find({ login: user })))
//                 return done(null, false, {
//                     message: 'User not found',
//                 });
//             else if (!(await global.UserModel.find({ login: user, password: password })))
//                 return done(null, false, {
//                     message: 'Wrong password',
//                 });


//             let usr = await global.UserModel.findOne({ login: user, password: password });
//             //console.log(usr)
//             return done(null, { id: usr._id, login: usr.login, isAdmin: usr.isAdmin });
//         })
// );

passport.use(
    new JwtStrategy(
        {
            secretOrKey: "my very secret secret",
            jwtFromRequest: jwtFromRequest.fromAuthHeaderAsBearerToken()
        },
        async function (jwt_payload, done) {
            console.log(JSON.stringify(jwt_payload));
            let res = await global.UserModel.findOne({ login: jwt_payload.login });
            console.log(res);

            if (res === null) { done(true, null) }
            else {
                done(null, res);
            }
        }
    )
)

const axios = require("axios");
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

const catalogController = require("./Catalog");
const reviewController = require("./ReviewController.js");
const newsController = require("./NewsController.js");
const registerController = require("./RegisterController.js");
const allCatalogController = require("./allCatalog.js");
const userController = require("./UserController.js");

// определяем обработчик для маршрута "/"

app.get("/login", (req, resp) => {
    if (req.user) {
        console.log("user out")
        req.logOut((err) => { });
    }
    resp.render("login");
});

app.post("/logout", (req, resp) => {
    req.logOut((err) => { });
})

app.post('/login', extPars, async (req, resp) => {
    console.log("in login");
    console.log(`${JSON.stringify(req.body)}`)
    let usr = await global.UserModel.findOne({ login: req.body.data.login, password: req.body.data.password })
    if (usr == null) return resp.status(401).json({ message: "There is no user with this login and password" });

    const token = jwt.sign({ userId: usr._id, isAdmin: usr.isAdmin, login: usr.login }, 'my very secret secret', { expiresIn: '5h' });

    console.log(token)

    return resp.json({ token });
}
)

app.get("/", (request, response) => {
    response.redirect("/index");
});

app.get("/index", async function (request, response) {
    //console.log(request.user)
    console.log("index")
    let resp1 = await axios.get("https://official-joke-api.appspot.com/random_joke");
    //console.log(res)

    let resp2 = await axios.get("https://catfact.ninja/fact");
    // console.log(resp1.data.setup);
    // console.log(resp2.data.fact);


    return response.render("index.hbs", { api1: resp1.data.setup + resp1.data.punchline, api2: resp2.data.fact });
    // отправляем ответ
});

// app.use("/catalog", checkPrivelege);
// app.use("/catalog/delete/:id", checkPrivelege);
// app.use("/catalog/update/:id", checkPrivelege)


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

app.get("/users/:id", userController.getNameById)

// начинаем прослушивать подключения на 3000 порту
app.listen(3001);
console.log("App is running");