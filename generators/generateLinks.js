const fs = require('fs');
const readLine = require('readline');

const linksFolder = 'links/';
const fileOutPath = 'js/search-links.js';

const preLine = 'search.addDoc("';
const postLine = '","","link");';
const generatedFileText = "/** Generated file, modifications will be overwritten! **/\n";

var outFile = fs.createWriteStream(fileOutPath, {
    flags: 'a' // 'a' means appending (old data will be preserved)
});

fs.truncateSync(fileOutPath, 0);

outFile.write(generatedFileText);
let outLines = []
let lineReaders = 0;
fs.readdirSync(linksFolder).forEach(function (file) {
    if (file != 'index.html') {
        console.log("reading", file);
        var lineReader = readLine.createInterface({
            input: fs.createReadStream(linksFolder + file)
        });
        lineReaders++;

        lineReader.on('line', function (line) {
            if (line != '') {
                console.log('pushing', line);
                outLines.push(preLine + line + postLine + '\n');
            }
        });

        lineReader.on('end', function () {
            console.log("end");
        });

        lineReader.on('close', function () {
            console.log("close");
            lineReaders--;
            console.log("current lineReaders "+lineReaders);
            if (lineReaders<1) {
                console.log('sorting '+ outLines.length);
                outLines.sort();
                for (var i = 0, len = outLines.length; i < len; i++) {
                    console.log('writing', outLines[i]);
                    fs.writeFileSync(fileOutPath, outLines[i], {'flag': 'a'});
                }
            }
        });
    }
});





