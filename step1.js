const process = require('process')
const fs = require('fs');
const argv = process.argv;

function cat(filename) {
    fs.readFile(filename, "utf8", function (err, data) {
        if (err) {
            console.log("An error!, ", err);
            process.kill(-2);
        }
        console.log(data);
    });
}

cat(argv[2]);