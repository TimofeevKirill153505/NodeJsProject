async function getNameById(req, resp) {
    return await global.UserModel.findById(req.params["id"]);
}

exports.getNameById = getNameById;