const authMiddleware = require("../middleware/auth.middleware");

module.exports = app => {
    const feedController = require('../controllers/feed.controller');
    const router = require("express").Router();
    const bodyParser = require("body-parser");
   
    app.use(bodyParser.json());

    // Feed Routes
    
    router.post("/createFeed",authMiddleware.authenticatetoken, feedController.createFeed);
    router.get("/deleteFeed/:id",authMiddleware.authenticatetoken, feedController.deleteFeed);
    
    router.post("/feedAllocationToAdmin",authMiddleware.authenticatetoken, feedController.deleteFeed);
    
    app.use('', router);
}