var bcrypt = require('bcrypt');
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
                    const userDetails = { name: userName, role: data.role, access: data.access };
                    const accessToken = jwt.sign(userDetails, process.env.ACCESS_TOKEN);
                    data.update({ token: accessToken }, { where: { id: data.id } }).then((data) => { })
                    res.json({ accessToken: accessToken, status: true, message: 'logged in' });
                } else {
                    res.send({ status: false, message: 'User name or password is wrong' });
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.send({ status: false, message: 'user not found' })
        })
}

/**
 * create users by superadmin
 */
exports.createUser = (req, res, next) => {

    let password = '';
    const userSave = new Promise((resolve, reject) => {
        userExists = Users.findOne({ where: { name: req.body.name } }).catch(err => { console.log('dsacs') });
        if (!userExists) {
            resolve()
        } else {
            reject();
        }
    }).catch(err => { console.log(err) });
    userSave.then((data) => {
        // password = bcrypt.hash(req.body.password, 10);
    });
    userSave.then((hash) => {
        console.log(password);
        return;
        const users = {
            name: req.body.name,
            role: req.body.role,
            access: req.body.access,
            email: req.body.email,
            password: hash
        };
        Users.create(users)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Tutorial."
                });
            });
    }).catch(err => {
        console.log(err)
        res.send('user already exixts');
    })
}
