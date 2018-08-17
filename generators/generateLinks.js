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
fs.readdirSync(linksFolder).forEach(function (file) {
    if (file != 'index.html') {
        console.log("reading", file);
        var lineReader = readLine.createInterface({
            input: fs.createReadStream(linksFolder + file)
        });

        lineReader.on('line', function (line) {
            if (line != '') {
                console.log('writing', line);
                outFile.write(preLine + line + postLine + '\n');
            }
        });
    }
});




