const fs = require('fs');

exports.writeLog = (req, res, next) => {
    let timestamp = Date.now();
    fs.readdir("./logs", function (err, files) {
        if (err) {
            console.error("Could not list the directory.", err);
            process.exit(1);
        }
        file.asort();
        const file = files.find(filename => filename < timestamp + ".txt")
        console.log(file);
        const userId = (req.user) ? req.user.userID : 0;
        const logData = {
            userId: userId,
            arguments: req.body ?? ''
        }
        fs.appendFile('./logs/' + file, "\n" + timestamp + "  - " + JSON.stringify(logData), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    });
    next();
}