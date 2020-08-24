let helper = {};

helper.paramsToJson = function (body) {
    let pet_data = {
        "name": body.name,
        "owner": body.owner,
        "species": body.species,
        "race": body.race,
        "age": body.age,
        "obs": body.obs
    };

    return pet_data;
}

module.exports = helper;