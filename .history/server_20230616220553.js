const express = require("express");
const app = express();
const env = require('dotenv');
const jwt = require("jsonwebtoken");


const users =[
{user : 'admin',name : 'dasdsad'}
];

app.get('/', (req, res) =>{
    res.send(users);
});

app.post('login', (req,res) =>{
    const userName = req.body.userName;
    const user={name : userName};
    jwt.sign(user, )
});

env.config();
const port = process.env.PORT
app.listen(port , ()=>{
    console.log('app is listening at port ' +port  );
});