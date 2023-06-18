const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const db = require('../config/db.config');
const Users = db.user;


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createUser = (req, res, next) => {
    let users = {
        name: req.body.name,
        role: req.body.role,
        access: req.body.access,
        email: req.body.email,
    };
    const tokenRole = req.user.role;
    if (tokenRole == 'admin' && req.user.access.includes("create")) {
        if (req.body.role == "admin" || req.body.role == "superadmin") {
            res.send({ status: false, message: 'you dont have permission to create an admin user' })
        }
    } else if(tokenRole == 'admin' && !req.user.access.includes("create")) {
        res.send({ status: false, message: 'access denied' })
    }

    const userSave = new Promise((resolve, reject) => {
        Users.findOne({ where: { name: req.body.name } })
            .then(data => {
                if (!data) {
                    let password = bcrypt.hash(req.body.password, 10);
                    resolve(password);
                } else {
                    reject();
                }
            }).catch(err => { console.log('dsacs') });
    }).then((password) => {
        users.password = password;
        Users.create(users)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the User."
                });
            });
    }).catch(err => {
        console.log(err)
        res.send('user already exixts');
    })
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
