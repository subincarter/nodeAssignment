
const db = require('../models/user.model');
const Registration = db.Users;
exports.login = (req,res,next)=>{
    res.send('heloo');
}