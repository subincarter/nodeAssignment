const authMiddleware = require("../middleware/auth.middleware");
const logs = require("../config/logs.config");

module.exports = app => {
    const feedController = require('../controllers/feed.controller');
    const router = require("express").Router();
    const bodyParser = require("body-parser");

    app.use(bodyParser.json());

    // Feed Routes
    router.get("/getFeeds", authMiddleware.authenticatetoken, logs.writeLog, feedController.getFeeds);

    router.post("/createFeed", authMiddleware.authenticatetoken, logs.writeLog, feedController.createFeed);
    router.get("/deleteFeed/:id", authMiddleware.authenticatetoken, logs.writeLog, feedController.deleteFeed);

    router.post("/feedAllocation", authMiddleware.authenticatetoken, logs.writeLog, feedController.feedAllocation);

    app.use('', router);
}