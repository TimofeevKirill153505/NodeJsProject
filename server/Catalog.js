
async function get(req, resp) {
    //car = new global.CarModel({ type: "universal", priceForHour: 15, mark: "Volvo" })
    //car.save()
    let carModels = await global.CarModel.find({});

    //console.log(carModels)
    return resp.json(carModels);
}

async function _delete(req, resp) {
    id = req.params["id"];
    console.log(`deleted id ${id}`);
    //finded = await global.CarModel.findById(id);
    //console.log(finded);
    await global.CarModel.findByIdAndDelete(id)
}

async function post(req, resp) {
    console.log("in post");
    console.log(req.body);
    let newCar = new global.CarModel({
        mark: req.body.markField,
        priceForHour: Number(req.body.priceField),
        type: req.body.typeField
    });
    console.log(newCar);
    newCar.save();

}

async function updateGet(req, resp) {
    //console.log();
    item = await globalThis.CarModel.findById(req.params["id"]);
    return resp.render("CatalogViews/edit.hbs", {
        mod: item, isSedan: item.type == "sedan",
        isCoupe: item.type == "coupe", isUniversal: item.type == "universal"
    });
}

async function updatePost(req, resp) {
    console.log("in update");
    let obj = {
        mark: req.body.markField,
        priceForHour: Number(req.body.priceField),
        type: req.body.typeField
    };
    console.log(req.params["id"])
    await global.CarModel.findByIdAndUpdate(req.params["id"], obj);

    resp.redirect("/catalog");
}

exports.get = get;
exports._delete = _delete;
exports.post = post;
exports.updateGet = updateGet;
exports.updatePost = updatePost;


