
const db = require('../models/user.model');
const Users = db.Users;
exports.login =async (req,res,next)=>{
    const userName = req.body.username;
    const password = req.body.password;
    const users = await Users.findAll({where : {name : userName}})
    .then((data)=>{

    }).then((data)=>{
            const userDetails = { name: userName, role:  data.role , access : data.access };
            const accessToken = jwt.sign(userDetails, process.env.ACCESS_TOKEN);
            res.send({ accessToken: accessToken });
    }).catch(err =>{
        console.log(err);
    })

    res.send(req.body.username);
}