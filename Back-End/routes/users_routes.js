const controller = require("../controllers/user_controller");

// Module exporting all routes for the /users/ API.
module.exports = (function() {
    var router = require('express').Router();

    // API Route responsible for validating a combination of user and password.
    router.post('/validate', async function(req, res) {
        let is_valid = await controller.validateUser(req.body.user, req.body.password);
        
        // Case user is valid.
        if(is_valid.valid_user){
            res.status(200)
                .json(is_valid.user)
                .end();
        }
        else{
            // Case user is invalid.
            if(!is_valid.valid_user){
                res.status(401)
                    .end();
            }
            
            // In case of generic error (return is null or undefined).
            else{
                res.status(500)
                    .end();
            }
        }
    });

    // API Route responsible for creating a new user and setting it's type.
    router.post('/create', async function(req, res) {
        // Case if it's a common user creation (doesn't need validator user).
        if(typeof(req.body.new_type)=="undefined" || req.body.new_type=="common"){
            let is_success = await controller.createUser(req.body.new_user, req.body.new_password, "common");

            // Case the new user was successfully created.
            if(is_success.is_created){
                res.status(200)
                    .end();
            }
            // Case the new user wasn't created, because of any error.
            else{
                res.status(500)
                    .json({ mongo_error: is_success.error_message})
                    .end();
            }
        }
        // Case if it's a special user creation (need validator user).
        else if(req.body.new_type=="colaborator" || req.body.new_type=="admin"){
            let is_valid = await controller.validateUser(req.body.validator_user, req.body.validator_password);

            // Case if validator user is valid.
            if(is_valid.valid_user){
                let is_success = await controller.createUser(req.body.new_user, req.body.new_password, req.body.new_type);
    
                // Case the new user was successfully created.
                if(is_success.is_created){
                    res.status(200)
                        .end();
                }
                // Case the new user wasn't created, because of any error.
                else{
                    res.status(500)
                        .json({ Error: is_success.error_message})
                        .end();
                }
            }
            // Case if validator user is invalid.
            else{
                res.status(401)
                    .json({"error": "Validator user invalid."})
                    .end();
            }
        }
        // Case if it's a non-valid type user creation.
        else {
            res.status(406)
                .json({"error": "New user type is invalid."})
                .end();
        }
    });

    // API Route responsible for deleting a user from the database.
    router.post('/delete', async function(req, res) {
        let permission = false;         // Variable to control permission for the deletion.
        let user = req.body.user;
        let deleter = req.body.deleter;
        let deleter_password = req.body.deleter_password;

        // Checking if the paramaters exists.
        if(user == undefined || deleter == undefined || deleter_password == undefined || user == "" || deleter == "" || deleter_password == ""){
            res.status(400)
                .json({Error: "Invalid or non existant parameters."})
                .end();

            return;
        }

        let user_exists = await controller.validateExistance(user);                 // Checking if the user thats gonna be deleted exists.

        // Case the deleter isn't deleting it's own account.
        if(user != deleter){
            let deleter_exists = await controller.validateExistance(deleter);       // Checking if the user thats deleting exists.
            
            if(user_exists.valid_user && deleter_exists.valid_user){
                // Checking if the deleter is a admin.
                let deleter_type = await controller.getType(deleter);  

                if(deleter_type=="admin"){
                    permission = true;
                }
            }
            else{
                res.status(400)
                    .json({Error: "Invalid user. It doesn't exists."})
                    .end();

                return;
            }
        }
        // Case the deleter is deleting it's own account.
        else{
            if(user_exists.valid_user){
                 permission = true;
            }
            else{
                res.status(400)
                    .json({Error: "Invalid user. It doesn't exists."})
                    .end();

                return;
            }
        }

        // Checking if the user may delete the account.
        if(permission){
            let is_valid = await controller.validateUser(deleter, deleter_password);

            // Case Deleter is validated.
            if(is_valid.valid_user){
                let is_deleted = await controller.deleteUser(user);

                // Checking if the user was deleted.
                if(is_deleted.success){
                    res.status(200)
                        .end();
                }
                else{
                    res.status(500)
                        .json({Error: is_deleted.error_message})
                        .end();
                }
            }
            else{
                res.status(401)
                    .json({Error: "Deleter user not authorized."})
                    .end();
            }
        }
        else{
            console.log("Permission to delete account denied. Operation wasn't completed.");

            res.status(403)
                .json({Error: "Permission denied."})
                .end();

        }
    });

    return router;
})();
