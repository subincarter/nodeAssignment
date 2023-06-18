const authMiddleware = require("../middleware/auth.middleware");

module.exports = app => {
    const authController = require('../controllers/auth.controller');
    const router = require("express").Router();
    const bodyParser = require("body-parser");
   
    app.use(bodyParser.json());

    // Auth Routes
    router.post("/login", authController.login);
    router.get("/logout", authController.logout);

    router.post("/createUser",authMiddleware.authenticatetoken, authController.createUser);
    router.get("/deleteUser/:id",authMiddleware.authenticatetoken, authController.deleteUser);

    router.post("/addAccess",authMiddleware.authenticatetoken, authController.addAccess);

    
    app.use('', router);
}