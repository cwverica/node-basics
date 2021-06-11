const process = require('process')
const fs = require('fs');
const axios = require('axios');
const argv = process.argv;

function cat(filename, out) {
    fs.readFile(filename, "utf8", function (err, data) {
        if (err) {
            console.log("An error!: ", err);
            process.kill(-2);
        }
        outputData(data, out);
    });
}

async function webCat(url, out) {
    try {
        let resp = await axios.get(url);
        outputData(resp.data, out);
    } catch (err) {
        console.log("An errrrrr!: ", err);
    }
}

function isWeb(path, out) {
    ;
    if (path.slice(0, 4).toLowerCase() === 'http') {
        webCat(path, out);
    } else {
        cat(path, out);
    }

}

function outputData(data, out) {
    if (out) {
        fs.writeFile(out, data, 'utf8', function (err) {
            if (err) {
                console.error('An Error!: ', err);
                process.exit(3);
            }
        });
    } else {
        console.log(data);
    }
}
let out;
let path;

if (argv[2] === '--out') {
    out = argv[3]
    path = argv[4]
} else {
    path = argv[2]
}

isWeb(path, out)