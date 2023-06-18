const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const db = require('../config/db.config');
const Feeds = db.feeds;
const User = db.user;


/**
 * get the feeds by user type.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getFeeds = async (req, res, next) => {
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
           return  res.send({ status: false, message: 'You dont have access to read the feed' });
        }
        feeds = await Feeds.findAll({ where: { user_id: req.user.id } });
    }
    if (feeds.length > 0) {
        return res.send({ status: true, feeds: feeds });
    }

    res.send({ status: false, message: 'no feeds' });
}

/**
 * superadmin can only access to create the feeds
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createFeed = (req, res, next) => {
    let feeds = {
        name: req.body.name,
        url: req.body.url,
        description: req.body.description,
    };
    const tokenRole = req.user.role;
    if (tokenRole != 'superadmin') {
        res.send({ status: false, message: 'you dont have permission to create feeds' })
    }
    Feeds.create(feeds)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Feeds."
            });
        });
}

/**
 * superadmin and admin( has access) is able to delete the feed
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteFeed = async (req, res) => {
    const id = req.params.id;
    let canDelete = false;
    if (req.user.role === 'superadmin') {
        canDelete = true;
    } else if (req.user.role === 'admin' && req.user.access.includes("delete")) {
        const getFeedById = await Feeds.findOne({ where: { id: id } })
        if (getFeedById.admin_user_id != req.user.userID) {
            res.send({ status: false, message: `Cannot delete feed with id=${id}. Access denied!` });
        }
        canDelete = true;
    }
    if (canDelete) {
        await Feeds.destroy({
            where: { id: id }
        }).then(c => {
            if (num == 1) {
                res.send({ status: true, message: "Feed was deleted successfully!" });
            } else {
                res.send({ status: false, message: `Cannot delete Feed with id=${id}. Maybe feed was not found!` });
            }
        }).catch(err => {
            res.status(500).send({ message: "Could not delete Feed with id=" + id });
        });
    }
    res.send({ status: false, message: 'access denied' });
}

/**
 *  superadmin and admin( has access) is able to allocate  the feed
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.feedAllocation = async (req, res, next) => {
    const feedID = req.body.feedID
    const userID = req.body.userID
    let userRole = '';
    if (req.user.role == 'superadmin') {
        const user = await User.findOne({ where: { id: userID } })
        userRole = user.role;
    } else if (req.user.role === 'admin' && req.user.access.includes("allocate")) {
        const getFeedById = await Feeds.findOne({ where: { id: feedID } })
        if (getFeedById && getFeedById.admin_user_id != req.user.userID) {
            return res.send({ status: false, message: `You dont have accees to feed  =${feedID}. Access denied!` });
        }
    } else if (req.user.role === 'user') {
       return res.send({ status: false, message: `Access denied! user dont have access to allocate feeds` });
    }else{
        return res.send({ status: false, message: `Access denied! user dont have access to allocate feeds` });
    }
    if (userRole == 'admin') {
        await Feeds.update({ admin_user_id: userID }, { where: { id: feedID } })
            .then((num) => {
                if (num == 1) {
                   return res.send({ status: true, message: 'allocated' });
                }
               return res.send({ status: false, message: 'feed not found ! or may be feed already allocated' });
            })
            .catch(err => {
                console.log(err);
            })
    } else {
        console.log(feedID);
        await Feeds.update({ user_id: userID }, { where: { id: feedID } })
            .then((num) => {
                if (num == 1) {
                    return   res.send({ status: true, message: 'allocated' });
                }
                return res.send({ status: false, message: 'feed not found ! or may be feed already allocated' });
            })
            .catch(err => {
                console.log(err);
            })
    }
}