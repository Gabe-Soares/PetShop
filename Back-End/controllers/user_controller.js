const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

let controller = {};

controller.validateUser = async function(u, p){
    let valid_user;

    // Connect to the db
    const db = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(err => { console.log(err); });
        
    if (!db) {
        throw "Erro - objeto de conexão nulo.";
    }

    try{
            const db_petshop = db.db("petshop");
            let coll = db_petshop.collection("users");
            var res = await coll.findOne({user: u, password: p}, {projection: {"_id": false, "password": false}})
                .catch(err => { db.close(); console.log(err); });

                if(res != null){
                    valid_user = true;
                    console.log("User '" + u + "' is valid.");
                }
                else{
                    valid_user = false;
                    console.log("User '" + u + "' is invalid.");
                }
    }
    catch(err){
        console.log(err);
    }
    finally{
        db.close();
    }

    return {valid_user, user: res};
}

controller.validateExistance = async function(u){
    let valid_user;

    // Connect to the db
    const db = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(err => { console.log(err); });
        
    if (!db) {
        throw "Erro - objeto de conexão nulo.";
    }

    try{
            const db_petshop = db.db("petshop");
            let coll = db_petshop.collection("users");
            var res = await coll.findOne({user: u}, {projection: {"_id": false, "password": false}})
                .catch(err => { db.close(); console.log(err); });

                if(res != null){
                    valid_user = true;
                    console.log("User '" + u + "' does exists.");
                }
                else{
                    valid_user = false;
                    console.log("User '" + u + "' doesn't exists.");
                }
    }
    catch(err){
        console.log(err);
    }
    finally{
        db.close();
    }

    return {valid_user};
}

controller.createUser = async function(u, p, user_type){
    let new_user = {user: u, password: p, type: user_type};
    let is_created = false;
    let error_message;

    // Connect to the db
    const db = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(err => { console.log(err); });
        
    if (!db) {
        throw "Erro - objeto de conexão nulo.";
    }

    try{
            const db_petshop = db.db("petshop");
            let coll = db_petshop.collection("users");
            await coll.insertOne(new_user)
                .then(result => {console.log("Successfully created the user " + u + "."); is_created = true;})
                .catch(err => { db.close(); console.log(err); is_created = false; error_message = err});
    }
    catch(err){
        console.log(err);
    }
    finally{
        db.close();
    }

    return {is_created, error_message};
}

module.exports = controller;