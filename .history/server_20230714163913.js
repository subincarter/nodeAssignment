const express = require("express");
const app = express();
const env = require('dotenv');
const bcrypt = require('bcrypt');
const authMiddleware = require("./app/middleware/auth.middleware");
const db = require('./app/config/db.config');
const authController = require('./app/controllers/auth.controller');
const Users = db.user;
const fs = require('fs');


env.config();
app.use(express.json());

/**
 * initialize the app
 */
app.get('/', async (req, res) => {
    res.send('app initialized');
});

/**
 * auth routes
 */
require("./app/routes/auth.routes")(app);

/**
 * Feed routes
 */
require("./app/routes/feed.routes")(app);

/**
 * log routes
 */

app.get('/showLogs', authMiddleware.authenticatetoken, (req, res) => {
    if (req.user.role == "superadmin") {
        let timestamp = Date.now();
        let fileNameToRead = '';
        fs.readdir("./logs", function (err, files) {
            if (err) {
                console.error("Could not list the directory.", err);
                res.send('no directory');
            }
            files.sort();
            files.reverse();
            fileNameToRead = files.find(filename => filename < timestamp + ".txt")
            console.log(fileNameToRead);
            let path = "./logs/" + fileNameToRead;

            fs.readFile(path, function (err, data) {
                res.set('Content-Type', 'text/html');
                console.log(err)
                console.log(path)
                return res.send(data);
            });
        });
    }else{
        res.send({status : false, message : "access denied"})
    }
});

const port = process.env.PORT
app.listen(port, async() => {
    console.log('app is listening at port ' + port);

    /**
     * creatimg super user on server startup
     */
    await authController.superUser();


    /**
     * create a log file for every five minutes , change the minutes varibles value for the interval you want.
     * it will convert to milliseconds 
     */
    var minutes = 5, the_interval = minutes * 60 * 1000;

    setInterval(function () {
        console.log("log file created");
        let timestamp = Date.now();
        fs.appendFile('./logs/' + timestamp + '.txt', '', function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }, the_interval);
    console.log(the_interval);

    /**
     * delete a log file created before 30 minutes , to change interval modify the delminutes variable .
     * it will convert to milliseconds 
     */
    var delminutes = 30, the_interval = delminutes * 60 * 1000;
    let filedeleteTime = Date.now() - 30000 * 60;

    setInterval(function () {
        fs.readdir("./logs", function (err, files) {
            files.forEach(filename => {
                console.log(filename);
                if (filename < filedeleteTime + '.txt') {
                    fs.unlink("./logs/" + filename, (err) => {
                        if (err) throw err;
                        console.log('file deleted');
                    })
                }
            })
        })
    }, the_interval);
});

