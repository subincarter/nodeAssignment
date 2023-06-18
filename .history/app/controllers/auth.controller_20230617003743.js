
const db = require('../models/user.model');
const Users = db.Users;
exports.login =async (req,res,next)=>{
    const userName = req.body.username;
    const users = await Users.findAll({where : {name : userName}})
    .then(()=>{
            const user = { name: userName };
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
            res.send({ accessToken: accessToken });
    }).catch(err =>{
        console.log(err);
    })

    res.send(req.body.username);
}