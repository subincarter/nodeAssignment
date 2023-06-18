const express = require("express");
const app = express();
const env = require('dotenv');
const authMiddleware = require("./app/middleware/auth.middleware");
const db = require('./app/config/db.config'); 
env.config();
app.use(express.json());

/**
 * initialize the app
 */
app.get('/', (req, res) => {
    db.sequelize.sync()
    .then(() => {
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

app.get('/feed', authMiddleware.authenticatetoken, (req, res) => {
    // res.json
    console.log(req.user.access);
    res.json({ cascsa: "cascsa" });
});

const port = process.env.PORT
app.listen(port, () => {
    console.log('app is listening at port ' + port);
});