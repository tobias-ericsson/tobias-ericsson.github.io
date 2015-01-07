var marked = require('marked');

function makeHtml(markdown) {
    return marked(markdown);
}

module.exports.makeHtml = makeHtml;
console.log('markdown loaded');

