var bcrypt = require('bcrypt');
const db = require('../models/user.model');
const Users = db.Users;
exports.login = async (req, res, next) => {
    const userName = req.body.username;
    const password = req.body.password;
    const users = await Users.findAll({ where: { name: userName } })
        .then((data) => {
            var hash = data.password;
            hash = hash.replace(/^\$2y(.+)$/i, '$2a$1');
            bcrypt.compare(req.body.pass, hash, function (err, success) {
                let access = JSON.parse(data.access);
                access.push('Dashboard');
                if (success) {
                    services.addSession(data.id, access, req)
                    let cookie = [
                        { 'userID': data.id, access: access, logged_in: true }
                    ];
                    res.set('Set-Cookie', `loginSession = ${JSON.stringify(cookie)}`);
                    res.send({ user: data.name, type: 'user', status: 200, access: services.getClientAccess(access) });
                } else {
                    res.send({ status: false, message: 'User name or password is wrong' });
                }
            });
        }).then((data) => {
            const userDetails = { name: userName, role: data.role, access: data.access };
            const accessToken = jwt.sign(userDetails, process.env.ACCESS_TOKEN);
            res.send({ accessToken: accessToken });
        }).catch(err => {
            console.log(err);
        })

    res.send(req.body.username);
}