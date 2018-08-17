const fs = require('fs');
const util = require('./util');

const folders = ['notes/', 'bin/', 'code/'];
const fileOutPath = 'index.html';

const preLine = "<p><a href='/";
const postLine = '</a></p>';
const generatedFileText = "<!-- Generated file, modifications will be overwritten! -->\n";

function getBackPath(path) {
    var slashIndex = path.substring(0, path.length - 1).lastIndexOf('/');
    if (slashIndex > 0) {
        return path.substring(0, slashIndex);
    } else {
        return "menu.html";
    }
}

function createIndexFiles(folder) {

    if (fs.existsSync(folder + fileOutPath)) {
        fs.truncateSync(folder + fileOutPath, 0);
    }

    var outFile = fs.createWriteStream(folder + fileOutPath, {
        flags: 'a' // 'a' means appending (old data will be preserved)
    });

    outFile.write(generatedFileText);
    var backPath = getBackPath(folder);
    outFile.write(preLine + backPath + "'><img src='pics/backbutton.png' />" + postLine + '\n');
    console.log(folder);
    fs.readdirSync(folder).forEach(function (file) {
        if (file != 'index.html') {
            let gitDate = util.gitDate('"' + folder + file + '"');
            if (folder.indexOf('/Old') != -1) gitDate = "-2016";

            outFile.write(preLine + folder + file + "'>" +
                util.makeFileNameNiceIfMD(file) + ' <span class="gitDate"> ' + gitDate + '</span>' +
                postLine + '\n');
        }
        stat = fs.statSync(folder + file);
        if (stat.isDirectory()) {
            createIndexFiles(folder + file + "/");
        }
    });
}

folders.forEach(function (folder) {
    console.log(folder);
    createIndexFiles(folder);
});

