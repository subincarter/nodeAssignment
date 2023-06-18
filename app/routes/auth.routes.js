const authMiddleware = require("../middleware/auth.middleware");
const logs = require("../config/logs.config");

module.exports = app => {
    const authController = require('../controllers/auth.controller');
    const router = require("express").Router();
    const bodyParser = require("body-parser");
   
    app.use(bodyParser.json());

    // Auth Routes
    router.post("/login", logs.writeLog ,authController.login);
    router.get("/logout", authController.logout);

    router.post("/createUser",authMiddleware.authenticatetoken,logs.writeLog , authController.createUser);
    router.get("/deleteUser/:id",authMiddleware.authenticatetoken, logs.writeLog ,authController.deleteUser);

    router.post("/updateAccess",authMiddleware.authenticatetoken,logs.writeLog , authController.updateAccess);

    
    app.use('', router);
}