const process = require('process')
const fs = require('fs');
const axios = require('axios');
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

async function webCat(url) {
    try {
        let resp = await axios.get(url);
        console.log(resp.data);
    } catch (err) {
        console.log("An errrrrr!, ", err);
    }
}

function isWeb(path) {
    ;
    if (path.slice(0, 4).toLowerCase() === 'http') {
        webCat(path);
    } else {
        cat(path);
    }

}

isWeb(argv[2]);