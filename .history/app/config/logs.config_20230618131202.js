exports.writeLog = (req, res, next) => {
    fs.readdir("./logs", function (err, files) {
        if (err) {
            console.error("Could not list the directory.", err);
            process.exit(1);
        }
        const file = files.find(filename => filename < timestamp + ".txt")
        console.log(file);
    });
    next();
}