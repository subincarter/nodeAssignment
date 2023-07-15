const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const db = require('../config/db.config');
const Users = db.user;

/**
 * create jwt token for super admin
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.login = (req, res, next) => {
    const userName = req.body.username;
    const password = req.body.password;

    const users = Users.findOne({ where: { name: userName } })
        .then((data) => {
            var hash = data.password;
            hash = hash.replace(/^\$2y(.+)$/i, '$2a$1');
            bcrypt.compare(password, hash, function (err, success) {
                if (success) {
                    const userDetails = { name: userName, role: data.role, access: data.access, userID: data.id };
                    const accessToken = jwt.sign(userDetails, process.env.ACCESS_TOKEN,{expiresIn: "3600s"});
                    // data.update({ token: accessToken }, { where: { id: data.id } }).then((data) => { })
                    return   res.json({ accessToken: accessToken, status: true, message: 'logged in' });
                } else {
                    return   res.send({ status: false, message: 'User name or password is wrong' });
                }
            });
        })
        .catch(err => {
            console.log(err);
            return  res.send({ status: false, message: 'user not found' })
        })
}


exports.logout = (req, res) => {
    let authHeader = req.headers['authorization'];
    authHeader = undefined;
    return res.send({ status: true, message: "logged Out" });
}
/**
 * create users by superadmin
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
            return res.send({ status: false, message: 'you dont have permission to create an admin user' })
        }
    } else if (tokenRole == 'admin' && !req.user.access.includes("create")) {
        return res.send({ status: false, message: 'access denied' })
    } else if (tokenRole == 'user') {
        return res.send({ status: false, message: 'access denied' })
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
                return   res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the User."
                });
            });
    }).catch(err => {
        console.log(err)
        return   res.send('user already exixts');
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
                return  res.send({ status: true, message: "User was deleted successfully!" });
            } else {
                return  res.send({ status: false, message: `Cannot delete User with id=${id}. Maybe User was not found!` });
            }
        }).catch(err => {
            return  res.status(500).send({ message: "Could not delete User with id=" + id });
        });
    }
    return res.send({ status: false, message: 'access denied' });
}


exports.updateAccess = async (req, res, next) => {
    const userdID = req.body.userID;
    const access = req.body.access;
    if (req.user.role == 'user') {
       return  res.status(403).send({ status: false, message: 'access denied' });
    }
    await Users.update({ access: access }, { where: { id: userdID } }).catch(err => {
        console.log(err)
        return res.send({ status: false, message: 'failed to update the user access' });
    });
    return res.send({ status: true, message: 'user access updated' })
}

/**
 * 
 */
exports.superUser = async(req,res)=>{
    let users = {
        name: "superadmin",
        role: "superadmin",
        access: { access: ["edit", "delete", "read"] },
        email: 'superadmin@gmail.com',
    };
   
        users.password = await bcrypt.hash('superadmin', 10);
        await db.sequelize.sync()
            .then(async () => {
                const superUserExists = Users.count({ where: { role: 'superadmin' } })
                    .then(count => {
                        return (count > 0) ? true : false
                    });
                if (!superUserExists) {
                     Users.create(users)
                        .then(data => {
                            res.send(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while creating the Super User."
                            });
                        });
                }
                console.log('user already exists');
            })
            .catch((err) => {
                console.log(err);
            });
}