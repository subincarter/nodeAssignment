const express = require("express");
const app = express();
const env = require('dotenv');



const users =[
{user : 'admin',name : 'dasdsad'}
];

app.get('/', (req, res) =>{
    res.send(users);
});

app.post('login', (req,res) =>{

});

env.config();
const port = process.env.PORT
app.listen(port , ()=>{
    console.log('app is listening at port ' +port  );
});