const express = require("express");
const app = express();
const env = require('dotenv');
const jwt = require("jsonwebtoken");
env.config();
app.use(express.json());

const users = [
    { user: 'admin', name: 'dasdsad' }
];

app.get('/', (req, res) => {
    res.send(users);
});

app.post('/login', (req, res) => {
    const userName = req.body.username;
    const user = { name: userName };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
    res.send({ accessToken: accessToken });
});

const authenticatetoken = (req, res, next) => {
    const authHeader = req.header['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(req.headers['authorization']);
    if (!token) { return res.sendStatus(401) }
    jwt.verify(token, process.env.ACCESS_TOKEN , (err, user)=>{
        if(err){
            res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};
app.get('/feed',authenticatetoken, (req, res) => {
    // res.json
    console.log(req.user.name);
    res.json({cascsa:"cascsa"});
});

const port = process.env.PORT
app.listen(port, () => {
    console.log('app is listening at port ' + port);
});