const authMiddleware = require("../middleware/auth.middleware");

module.exports = app => {
    const feedController = require('../controllers/feed.controller');
    const router = require("express").Router();
    const bodyParser = require("body-parser");
   
    app.use(bodyParser.json());

    // Feed Routes
    router.post("/getFeeds",authMiddleware.authenticatetoken, feedController.getFeeds);

    router.post("/createFeed",authMiddleware.authenticatetoken, feedController.createFeed);
    router.get("/deleteFeed/:id",authMiddleware.authenticatetoken, feedController.deleteFeed);
    
    router.post("/feedAllocation",authMiddleware.authenticatetoken, feedController.feedAllocation);

    app.use('', router);
}