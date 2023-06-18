var bcrypt = require('bcrypt');
const db = require('../models/user.model');
const Users = db.users;

exports.login = async (req, res, next) => {
    const userName = req.body.username;
    const password = req.body.password;
    const users = await Users.findAll({ where: { name: userName } })
    .catch(err =>{
        console.log(err);
    });
    users.then((data) => {
            var hash = data.password;
            hash = hash.replace(/^\$2y(.+)$/i, '$2a$1');
            bcrypt.compare(password, hash, function (err, success) {
                if (success) {
                    const userDetails = { name: userName, role: data.role, access: data.access };
                    const accessToken = jwt.sign(userDetails, process.env.ACCESS_TOKEN);
                    res.json({ accessToken: accessToken , status : true , message : 'logged in'});
                } else {
                    res.send({ status: false, message: 'User name or password is wrong' });
                }
            });
        }).catch(err => {
            console.log(err);
        })
}