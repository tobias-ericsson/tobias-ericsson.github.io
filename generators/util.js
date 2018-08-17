const {execSync} = require('child_process');
// stderr is sent to stdout of parent process
// you can set options.stdio if you want it to go elsewhere

function makeFileNameNiceIfMD(file) {
    if (file.endsWith('.md')) {
        return minusToSpace(stripFileEnding(file));
    }
    return file;
}

function stripFileEnding(path) {
    return path.substring(0, path.lastIndexOf('.')) || path;
}

function minusToSpace(path) {
    return path.replace(/-/g, ' ');
}

function gitDate(file) {
    let stdout = execSync('git log -1 --format=%ci ' + file);
    let text = stdout.toString('utf-8');
    return text.split(' ')[0];
}

exports.minusToSpace = minusToSpace;
exports.gitDate = gitDate;
exports.stripFileEnding = stripFileEnding;
exports.makeFileNameNiceIfMD = makeFileNameNiceIfMD;




