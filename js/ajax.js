var request = require('superagent');
var markdown = require('./markdown');

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function splitUrl(url) {
    var lastIndexOfSlash = url.lastIndexOf('/');
    var file = url.substring(lastIndexOfSlash + 1);
    var path = url.substring(0, lastIndexOfSlash);
    return { path: path, file: file, href: url};
}

request.get('/notes.txt', function (res) {

    var lines = res.text.split('\n');
    var html = '<div>';
    var currentPath = '';
    var menuNav = document.getElementById("menu-nav");

    if (res.status === 200) {

        for (var index in lines) {
            if (lines[index].length > 0) {

                var elements = lines[index].split(',');
                var url = splitUrl(elements[0]);
                var date = elements[1];

                if (currentPath != url.path) {
                    currentPath = url.path;
                    html = html + '<h2>' + currentPath.replace('./notes/', '') + '</h2>';
                }
                var label = url.file.replace('.md', '');
                html = html + '<p><a target="_self" href="#' + url.href + '" >' +
                    label.split('-').join(' ') + '</a></p>';
                fetchNote(url.href, date);
            }
        }
        html = html + '</div>';
        menuNav.innerHTML = html;
    } else {
        console.log("status: " + res.status);
    }
});

function fetchNote(url, date) {
    request.get(url, function (res) {

        var contentSection = document.getElementById("content-section");
        var html = '';
        var title = '';
        var modifiedDate = date.split(' ')[0];

        if (res.status == 200) {
            if (url.indexOf('.md') > -1) {
                html = markdown.makeHtml(res.text);
            } else if (url.indexOf('.html') > -1) {
                html = html + res.text;
            } else {
                title = url.substring(url.lastIndexOf('/') + 1);
                html = '<h1>' + title + '</h1>';
                html = html + '<pre>' + res.text + '</pre>';
            }
        } else {
            html = html + "Error " + res.status;
        }
        html = html + '<p>' + modifiedDate + '</p>';
        contentSection.insertAdjacentHTML('beforeend', '<article id="' + url + '">' +
            '<div class="article">' + html + '</div></article>');

    });
}

module.exports.fetchNote = fetchNote;
console.log('ajax loaded');