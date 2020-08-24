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
                    .json({ mongo_error: result.error_message})
                    .end();
            }
        }

    });

    return router;
})();