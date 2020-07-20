const { DBRef } = require('mongodb');

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

let controller = {};

controller.validateUser = async function(u, p){
    var valid_user = false;

    // Connect to the db
    const db = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(err => { console.log(err); });
        
    if (!db) {
        throw "Erro - objeto de conexão nulo.";
    }

    try{
            const db_petshop = db.db("petshop");
            let coll = db_petshop.collection("users");
            let res = await coll.findOne({user: u, password: p})
                .catch(err => { db.close(); console.log(err); });

                if(res != null){
                    valid_user = true;
                    console.log("User '" + u + "' is valid.");
                }
                else{
                    console.log("User '" + u + "' is invalid.");
                }
    }
    catch(err){
        console.log(err);
    }
    finally{
        db.close();
    }
    
    return valid_user;
}

module.exports = controller;