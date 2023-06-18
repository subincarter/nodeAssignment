module.exports = app => {
    const authController = require('../controllers/auth.controller');
    const router = require("express").Router();
    const bodyParser = require("body-parser");
   
    app.use(bodyParser.json());

    // Auth Routes
    router.post("/login", authController.login);
    router.post("/createUser", authController.login);
    
    app.use('', router);
}