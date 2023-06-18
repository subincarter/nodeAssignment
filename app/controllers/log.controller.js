const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const db = require('../config/db.config');
const User = db.user;

/**
 * get the logs
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getLogs = async (req, res, next) => {
    let feeds = [];
    if (req.user.role == 'superadmin') {
        feeds = await Feeds.findAll();
    } else if (req.user.role == 'admin') {
        if (!req.user.access.includes('read')) {
            return res.send({ status: false, message: 'You dont have access to read the feed' });
        }
        feeds = await Feeds.findAll({ where: { admin_user_id: req.user.userID } });
    } else {
        if (!req.user.access.includes('read')) {
            return res.send({ status: false, message: 'You dont have access to read the feed' });
        }
        feeds = await Feeds.findAll({ where: { user_id: req.user.userID } });
    }
    if (feeds.length > 0) {
        return res.send({ status: true, feeds: feeds });
    }

    res.send({ status: false, message: 'no feeds' });
}

