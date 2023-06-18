const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const db = require('../config/db.config');
const Feeds = db.feeds;


/**
 * 
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
        }).then(num => {
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


exports.feedAllocationToAdmin = (req, res, next)=>{
    const feedID = req.params.feedID
    const adminUserID = req.params.adminUserID
    let canUpdate = false;
    if (req.user.role === 'superadmin') {
        canDelete = true;
    } else if (req.user.role === 'admin' && req.user.access.includes("delete")) {
        const getFeedById = await Feeds.findOne({ where: { id: id } })
        if (getFeedById.admin_user_id != req.user.userID) {
            res.send({ status: false, message: `Cannot update feed  =${id} to user. Access denied!` });
        }
        canDelete = true;
    }
    res.send(req.body.);
}