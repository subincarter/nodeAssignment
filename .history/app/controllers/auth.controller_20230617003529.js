
const db = require('../models/user.model');
const Users = db.Users;
exports.login =async (req,res,next)=>{
    const users = await Users.findAll({where : {name : req.body.username}}).then(()=>{

    }).catch(err =>{
        console.log(err);
    })

    res.send(req.body.username);
}