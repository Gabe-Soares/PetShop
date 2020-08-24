const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

let controller = {};

controller.addPet = async function(pet_data){
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
            let coll = db_petshop.collection("pets");
            await coll.insertOne(pet_data)
                .then(result => {console.log("Successfully added the pet " + pet_data.name + " to the owner " + pet_data.owner + "."); is_created = true;})
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

controller.removePet = async function(pet_name, pet_owner){
    let is_removed = false;
    let error_message;

    // Connect to the db
    const db = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(err => { console.log(err); });
        
    if (!db) {
        throw "Erro - objeto de conexão nulo.";
    }

    try{
            const db_petshop = db.db("petshop");
            let coll = db_petshop.collection("pets");
            await coll.deleteOne({"name": pet_name, "owner": pet_owner})
                .then(result => {console.log("Successfully removed the pet " + pet_name + " to the owner " + pet_owner + "."); is_removed = true;})
                .catch(err => { db.close(); console.log(err); is_removed = false; error_message = err});
    }
    catch(err){
        console.log(err);
    }
    finally{
        db.close();
    }

    return {is_removed, error_message};
} 

module.exports = controller;