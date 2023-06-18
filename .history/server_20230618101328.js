const express = require("express");
const app = express();
const env = require('dotenv');
const bcrypt = require('bcrypt');
const authMiddleware = require("./app/middleware/auth.middleware");
const db = require('./app/config/db.config');
const Users = db.user;
env.config();
app.use(express.json());


const users = {
    name: "superadmin",
    role: "superadmin",
    access: { access: ["edit", "delete", "read"] },
    email: 'superadmin@gmail.com',
    password : bcrypt.hash('superadmin', 10)
};
/**
 * initialize the app
 */
app.get('/', (req, res) => {
    db.sequelize.sync()
        .then(() => {

            Users.create(users)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Super User."
                    });
                });

        }).then(data =>{
            res.send({ status: true, message: 'app initialized' });

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

// app.get('/feed', authMiddleware.authenticatetoken, (req, res) => {
//     // res.json
//     console.log(req.user.access);
//     res.json({ cascsa: "cascsa" });
// });

const port = process.env.PORT
app.listen(port, () => {
    console.log('app is listening at port ' + port);
});