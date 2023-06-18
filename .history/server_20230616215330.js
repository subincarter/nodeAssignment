const express = require("express");
const app = express();
const env = require('dotenv');




app.listen(env.PORT , ()=>{
    console.log('app is listening at port ' +env.PORT  );
});