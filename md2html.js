#!/usr/bin/env node
var request = require('superagent');
var marked = require('marked');
fs = require('fs');

var args = process.argv.slice(2);

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', function(line){
    console.log('processing '+line);
    var filePath = line.split(',')[0];
    if (filePath.indexOf('.md') > -1) {
        md2html(filePath, filePath.replace('/notes/', '/html/').replace('.md', '') + '.html');
    }
});

/*
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(data) {
    console.log(data);
    var htmlDocument = md2html(data);
    process.stdout.write(htmlDocument);
});*/
/*
if (args.length < 1) {
    return console.log("md2html file.md");
} else {
    md2html(args[0]);
}*/

function md2html(filePath, newFilePath) {
    fs.readFile(filePath, 'utf8', function (err, data) {
        var htmlBegin = '<!doctype html>\n<html>\n';
        var headPart = '<head></head>\n';
        var bodyBegin = '<body>\n';
        var bodyEnd = '</body>\n';
        var htmlEnd = '</html>\n';
        var htmlContent = '';
        var htmlDocument = '';

        if (err) {
            return console.log(err);
        }

        htmlContent = marked(data);
        htmlDocument = htmlBegin + headPart + bodyBegin + htmlContent + bodyEnd + htmlEnd;

        if (newFilePath) {
            writeToFile(newFilePath, htmlDocument);
        } else {
            console.log(htmlDocument);
        }
    });
}

function writeToFile(filePath, text) {

    var filePathSplitted = filePath.split('/');
    //console.log(filePathSplitted);
    var temp = '.';
    for (var k=1;k<filePathSplitted.length-1;k++) {
        temp = temp+'/'+filePathSplitted[k];

        createDir(temp);
    }

    fs.writeFile(filePath, text, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log('wrote '+filePath);
    });
}

function createDir(dir) {
    if (!fs.existsSync(dir)) {
        console.log('creating dir '+dir);
        fs.mkdirSync(dir);
    }
}

