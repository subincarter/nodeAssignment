var bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const db = require('../config/db.config');
const Users = db.user;

exports.login = (req, res, next) => {
    const userName = req.body.username;
    const password = req.body.password;
    // Users.update({token : 'accessToken'},{where : {id : 1}}).then((success)=>{console.log(success)})
    // .catch((err)=>{
    //     console.log(err);
    // })
    Users.find({ where: { id: 1 } })
    .on('success', function (project) {
      // Check if record exists in db
      if (project) {
        project.update({
          tokrn: 'a very different title now'
        })
        .success(function () {})
      }
    })

    return ;
    const users = Users.findOne({ where: { name: userName } })
        .then((data) => {
            var hash = data.password;
            hash = hash.replace(/^\$2y(.+)$/i, '$2a$1');
            bcrypt.compare(password, hash, function (err, success) {
                if (success) {
                    const userDetails = { name: userName, role: data.role, access: data.access };
                    const accessToken = jwt.sign(userDetails, process.env.ACCESS_TOKEN);
                    res.json({ accessToken: accessToken, status: true, message: 'logged in' });
                } else {
                    res.send({ status: false, message: 'User name or password is wrong' });
                }
            });
        }).then(data=>{
            console.log(data);
            Users.update({token : accessToken},{id : data.id}).then((success)=>{})
        })
        .catch(err => {
            console.log(err);
            res.send({ status: false, message: 'user not found' })
        })
}