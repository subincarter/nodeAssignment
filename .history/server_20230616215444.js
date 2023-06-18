const express = require("express");
const app = express();
const env = require('dotenv');





const port = process.env.PORT
app.listen(port , ()=>{
    console.log('app is listening at port ' +env.PORT  );
});