const authMiddleware = require("../middleware/auth.middleware");

module.exports = app => {
    const authController = require('../controllers/auth.controller');
    const router = require("express").Router();
    const bodyParser = require("body-parser");
   
    app.use(bodyParser.json());

    // Auth Routes
    router.post("/login", authController.login);
    router.post("/createUser",authMiddleware.authenticatetoken, authController.createUser);
    
    app.use('', router);
}