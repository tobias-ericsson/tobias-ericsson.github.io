var pagedown = require('pagedown');

//var converter = new pagedown.Converter();
//var safeConverter = pagedown.getSanitizingConverter();
//var html = safeConverter.makeHtml("*Hello <script>doEvil();</script>*");
//console.log('html '+html);

function makeHtml(markdown) {
    var safeConverter = pagedown.getSanitizingConverter();
    return safeConverter.makeHtml(markdown);
}

module.exports.makeHtml = makeHtml;
console.log('markdown loaded');

