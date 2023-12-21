async function get(req, resp) {
    return resp.render("allCatalog", { cars: await global.CarModel.find({}) });
}

exports.get = get;