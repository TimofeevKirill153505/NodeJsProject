async function get(req, resp) {
    //car = new global.CarModel({ type: "universal", priceForHour: 15, mark: "Volvo" })
    //car.save()
    let reviewModels = await global.ReviewModel.find({});
    let lst = [];
    for (rev of reviewModels) {
        lst.push({ username: "anonym", rate: rev.rate, text: rev.text })
    }
    //console.log(carModels)
    return resp.render("CatalogViews/review.hbs", { reviewsObj: lst });
}

exports.get = get;