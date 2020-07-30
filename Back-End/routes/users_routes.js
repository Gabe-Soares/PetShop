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
            if(is_valid.valid_user == false){
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
                        .json({ mongo_error: is_success.error_message})
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

    return router;
})();
