const fs = require('fs');
const util = require('./util');

generateSearchData('notes/', 'note', readyOutFile('js/search-notes.js'));
generateSearchData('bin/', 'script', readyOutFile('js/search-scripts.js'));
generateSearchData('code/', 'code', readyOutFile('js/search-code.js'));

function readyOutFile(fileOutPath) {
    const generatedFileText = "/** Generated file, modifications will be overwritten! **/\n";
    fs.writeFileSync(fileOutPath, generatedFileText, {'flag': 'w'});
    return fileOutPath;
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

                fs.writeFileSync(outFile, preLine + content + '`,"' +
                    folder + file + postLine + gitDate + '");\n', {'flag': 'a'});

            }
        }
    });
}