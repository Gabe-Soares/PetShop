const controller = require("../controllers/pets_controller");
const helper = require("../helpers/pets_helper");
const users_controller = require("../controllers/user_controller");

// Module exporting all routes for the /pets/ API.
module.exports = (function() {
    var router = require('express').Router();

    // API Route responsible for adding new pet to the user.
    router.post('/add', async function(req, res) {
        let pet_data = helper.paramsToJson(req.body);       // Helper to manipulate data and format it as it's needed.

        let user_exists = await users_controller.validateExistance(req.body.owner);
        
        // Case owner doesn't exists.
        if(!user_exists.valid_user){
            res.status(406)
                .json({ error: "Owner username does not exists."})
                .end();

            console.log("Invalid owner username, pet wasn't added.");
        }
        else{
            let result = await controller.addPet(pet_data);     // Controller called to add the pet to the MongoDB Database.
    
            // Case the pet was successfully added.
            if(result.is_created){
                res.status(200)
                    .end();
            }
            // Case the pet wasn't added, because of any error.
            else{
                res.status(500)
                    .json({ mongo_error: result.error_message})
                    .end();
            }
        }

    });

    // API Route responsible for removing the pet.
    router.post('/remove', async function(req, res) {
        let user_exists = await users_controller.validateExistance(req.body.owner);
        
        // Case owner doesn't exists.
        if(!user_exists.valid_user){
            res.status(406)
                .json({ error: "Owner username does not exists."})
                .end();

            console.log("Invalid owner username, pet wasn't removed.");
        }
        else{
            let result = await controller.removePet(req.body.name, req.body.owner);     // Controller called to remove the pet of the MongoDB Database.
    
            // Case the pet was successfully removed.
            if(result.is_removed){
                res.status(200)
                    .end();
            }
            // Case the pet wasn't removed, because of any error.
            else{
                res.status(500)
                    .json({ Error: result.error_message})
                    .end();
            }
        }

    });

    // API Route responsible for updating pet.
    router.post('/update', async function(req, res) {
        let pet_data = helper.paramsToJson(req.body);       // Helper to manipulate data and format it as it's needed.

        let user_exists = await users_controller.validateExistance(req.body.owner);
        
        // Case owner doesn't exists.
        if(!user_exists.valid_user){
            res.status(406)
                .json({ error: "Owner username does not exists."})
                .end();

            console.log("Invalid owner username, pet wasn't updated.");
        }
        else{
            let result = await controller.updatePet(pet_data, req.body.pet_name_old);     // Controller called to update the pet to the MongoDB Database.
    
            // Case the pet was successfully added.
            if(result.is_updated){
                res.status(200)
                    .end();
            }
            // Case the pet wasn't updated, because of any error.
            else{
                res.status(500)
                    .json({ mongo_error: result.error_message})
                    .end();
            }
        }

    });

    // API Route responsible for retrieving list of pets.
    router.get('/search', async function(req, res) {
        let owner = req.query.user;

        if(owner != undefined && owner != ""){
            let user_exists = await users_controller.validateExistance(owner);
            
            // Case owner doesn't exists.
            if(!user_exists.valid_user){
                res.status(406)
                    .json({ error: "Owner username does not exists."})
                    .end();
    
                console.log("Invalid owner username, list of pets not retrieved.");
            }
            else{
                let result = await controller.getPets(owner);     // Controller called to get the list of pets for that owner.
        
                // Case the list was successfully retrieved.
                if(result.is_listed){
                    res.status(200)
                        .json(result.list)
                        .end();
                }
                // Case the list wasn't retrieved, because of any error.
                else{
                    res.status(500)
                        .json({ Error: result.error_message})
                        .end();
                }
            }
        }
        else{
            res.status(406)
                .json({ Error: "User parameter missing or invalid."})
                .end();
        }
    });

    return router;
})();