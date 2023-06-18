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

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    let canDelete = false;
    if (req.user.role === 'superadmin' && req.user.access.includes("delete")) {
        canDelete = true;
    } else if (req.user.role === 'admin' && req.user.access.includes("delete")) {
        const getUserById = await Users.findOne({ where: { id: id } })
        if (getUserById.role != "superadmin" || getUserById.role != "admin") {
            canDelete = true;
        }
    }
    if (canDelete) {
        await Users.destroy({
            where: { id: id }
        }).then(num => {
            if (num == 1) {
                res.send({ status: true, message: "User was deleted successfully!" });
            } else {
                res.send({ status: false, message: `Cannot delete User with id=${id}. Maybe User was not found!` });
            }
        }).catch(err => {
            res.status(500).send({ message: "Could not delete User with id=" + id });
        });
    }
    res.send({ status: false, message: 'access denied' });
}
