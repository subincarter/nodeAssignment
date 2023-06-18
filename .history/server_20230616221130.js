const express = require("express");
const app = express();
const env = require('dotenv').config();
const jwt = require("jsonwebtoken");

app.use(express.json);

const users =[
{user : 'admin',name : 'dasdsad'}
];

app.get('/', (req, res) =>{
    res.send(users);
});

app.post('/login', (req,res) =>{
    const userName = req.body.userName;
    const user={name : userName};
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);

    res.json({accessToken : accessToken})
});

const port = process.env.PORT
app.listen(port , ()=>{
    console.log('app is listening at port ' +port  );
});