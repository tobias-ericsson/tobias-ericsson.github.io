var request = require('superagent');
var markdown = require('./markdown');

request.get('/notes/notes.txt', function (res) {
    console.log('response', res);


    var lines = res.text.split('\n');
    var html = '<div>';
    for (var index in lines) {
        if (lines[index].length > 0) {
            var elements = lines[index].split(',');
            var path = elements[0];
            var label = elements[2].replace('.md', '');

            html = html + '<p><a href="#' + path + '">' + label + '</a></p>';
            fetchNote(path);
        }
    }
    html = html + '</div>';
    var menuNav = document.getElementById("menu-nav");
    menuNav.innerHTML = html;
});

function fetchNote(url) {
    request.get(url, function (res) {
        console.log('response', res);
        var contentSection = document.getElementById("content-section");
        var html = '';
        if (url.indexOf('.md') > -1) {
            html = markdown.makeHtml(res.text);
        } else if (url.indexOf('.html') > -1) {
            html = res.text;
        } else {
            html = '<pre>' + res.text + '</pre>';
        }
        contentSection.insertAdjacentHTML('beforeend', '<article id="' + url + '">' +
            '<div class="article">' + html + '</div></article>');
    });
}

module.exports.fetchNote = fetchNote;
console.log('ajax loaded');