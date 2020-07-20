const controller = require("../controllers/user_controller");

module.exports = (function() {
    var router = require('express').Router();

    router.post('/validate', async function(req, res) {
        let user = await controller.validateUser(req.body.user, req.body.password);
        res.json(user);
        res.status(200);
        res.end();
    });

    return router;
})();
