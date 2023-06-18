const jwt = require("jsonwebtoken");

exports.authenticatetoken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) { return res.sendStatus(401) }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user, access) => {
        if (err) {
            res.sendStatus(403);
        }
        req.user = user;
        req.access = access;
        next();
    });
}