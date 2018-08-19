const fs = require('fs');
const util = require('./util');

const generatedFileText = "<!-- Generated file, modifications will be overwritten! -->\n";

let version = util.gitVersion();
let date = util.gitDate('');
let text = generatedFileText + '<p>' + version + '</p><p>' + date + '</p>';

fs.writeFileSync("version.html", text, {'flag': 'w'});