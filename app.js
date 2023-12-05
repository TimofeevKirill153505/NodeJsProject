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
const catalogController = require("./Catalog");



// определяем обработчик для маршрута "/"
app.get("/", (request, response) => {
    response.redirect("/index");
});

app.get("/index", function (request, response) {

    response.render("index.hbs");
    // отправляем ответ
});

app.get("/catalog", catalogController.get);
app.get("/catalog/delete/:id", catalogController._delete);
app.post("/catalog", urlencodedParser, catalogController.post);

app.get("/catalog/update/:id", catalogController.updateGet)
app.post("/catalog/update/:id", urlencodedParser, catalogController.updatePost);



// начинаем прослушивать подключения на 3000 порту
app.listen(3000);
console.log("App is running");