const fs = require('fs');
const util = require('./util');

let outLines = [];
generateSearchData('notes/', 'note');
writeOutFile('js/search-notes.js');
outLines = [];
generateSearchData('bin/', 'script');
writeOutFile('js/search-scripts.js');
outLines = [];
generateSearchData('code/', 'code');
writeOutFile('js/search-code.js');

function readyOutFile(fileOutPath) {
    const generatedFileText = "/** Generated file, modifications will be overwritten! **/\n";
    fs.writeFileSync(fileOutPath, generatedFileText, {'flag': 'w'});
    return fileOutPath;
}

function writeOutFile(fileOutPath) {
    const generatedFileText = "/** Generated file, modifications will be overwritten! **/\n";
    fs.writeFileSync(fileOutPath, generatedFileText, {'flag': 'w'});
    outLines.sort();
    outLines.forEach(
        fs.writeFileSync(outFile, preLine + content + '`,"' +
                    folder + file + postLine + gitDate + '");\n', {'flag': 'a'}));
}

function generateSearchData(folder, type, outFile) {

    const preLine = 'search.addDoc(\n`';
    const postLine = '","' + type + '","';

    console.log("Generating search data for " + folder);

    fs.readdirSync(folder).forEach(function (file) {
        stat = fs.statSync(folder + file);
        if (stat.isDirectory()) {
            generateSearchData(folder + file + "/", type, outFile);
        } else {

            if (file != 'index.html') {

                let gitDate = util.gitDate('"' + folder + file + '"');
                /*console.log(gitDate);*/
                if (folder.indexOf('/Old')!=-1) gitDate = "-2016";

                var content = fs.readFileSync(folder + file, 'utf8');
                /*console.log(content);*/

                content = content.replace(/^\s*\n/gm, '');
                content = content.replace(/"/gm, '');
                content = content.replace(/`/gm, '');
                content = content.replace(/#/gm, '');
                content = content.replace(/\$/gm, '');

                outLines.push(content);
            }
        }
    });
}