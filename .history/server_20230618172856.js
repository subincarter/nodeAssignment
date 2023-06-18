const express = require("express");
const app = express();
const env = require('dotenv');
const bcrypt = require('bcrypt');
const authMiddleware = require("./app/middleware/auth.middleware");
const db = require('./app/config/db.config');
const Users = db.user;
const fs = require('fs');
const { exit } = require("process");


env.config();
app.use(express.json());


let users = {
    name: "superadmin",
    role: "superadmin",
    access: { access: ["edit", "delete", "read"] },
    email: 'superadmin@gmail.com',
};
/**
 * initialize the app
 */
app.get('/', async (req, res) => {
    users.password = await bcrypt.hash('superadmin', 10);
    await db.sequelize.sync()
        .then(async () => {
            const superUserExists = await Users.count({ where: { role: 'superadmin' } })
                .then(count => {
                    return (count > 0) ? true : false
                });
            if (!superUserExists) {
                await Users.create(users)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Super User."
                        });
                    });
            }
            res.send({ status: true, message: 'user already exixts' });
        })
        .catch((err) => {
            res.send({ status: false, error: 'failed to connect DB' });
        });
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
                process.exit(1);
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
        res.send('falase')
    }
});

const port = process.env.PORT
app.listen(port, () => {
    console.log('app is listening at port ' + port);
    var minutes = 1, the_interval = minutes * 60 * 1000;
    setInterval(function () {
        console.log("log file created");
        let timestamp = Date.now();
        fs.appendFile('./logs/' + timestamp + '.txt', '', function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }, the_interval);
    var minutes = 30, the_interval = minutes * 60 * 1000;
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