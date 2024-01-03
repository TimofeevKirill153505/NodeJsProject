async function get(req, resp) {
    console.log("in all catalog")
    return resp.json(await global.CarModel.find({}));
}

exports.get = get;