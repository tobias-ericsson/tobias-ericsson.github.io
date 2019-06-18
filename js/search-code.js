/** Generated file, modifications will be overwritten! **/
search.addDoc(
`@Grab('org.ccil.cowan.tagsoup:tagsoup:1.2.1')
import org.ccil.cowan.tagsoup.Parser
if (args.length <= 0) {
    println missing filename
    System.exit(1)
}
/* read file from args */
def file = args[0]
def slurper = new XmlSlurper(new Parser())
def rootNode = slurper.parse(new File(file))
def trs = rootNode.depthFirst().findAll { it.name() == 'tr' }
trs.each { it ->
    it.td.eachWithIndex { td, index ->
        println index +   + td
    }
}`,"code/HtmlParser.groovy","code","2018-08-13");
search.addDoc(
`function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}`,"code/StringUtil.js","code","2018-08-13");
search.addDoc(
`.grid-body {
    padding: 10px;
    background-color: fff;
    border: 1px solid black;
    height: 500px;
}
.grid-wrapper {
    display: grid;
    grid-gap: 5px;
    grid-template-rows: 40px 40px 40px 1fr 1fr 40px;
    height: 100%;
    padding: 0;
    margin: 0;
    grid-template-areas: search
                         links
                         header
                         nav
                         content
                         footer;
}
.grid-box {
    background-color: 444;
    color: fff;
    border-radius: 5px;
    padding: 5px 10px;
    margin: 0;
    font-size: 110%;
    text-align: center;
    vertical-align: middle;
    line-height: 30px;
}
grid-search {
    grid-area: search;
}
grid-links {
    grid-area: links;
}
grid-header {
    grid-area: header;
}
grid-nav {
    grid-area: nav;
}
grid-content {
    grid-area: content;
}
grid-footer {
    grid-area: footer;
}
@media (min-width: 500px) {
    .grid-wrapper {
        grid-template-areas: search links
                             header header
                             nav content
                             footer content;
        grid-template-rows: 40px 40px 1fr 40px;
        grid-template-columns: 120px 1fr;
    }
}
@media (min-width: 1000px) {
    .grid-wrapper {
        grid-template-areas: search links links
                             header header header
                             nav content .
                             footer content .;
        grid-template-rows: 40px 40px 1fr 40px;
        grid-template-columns: 120px 2fr 1fr;
    }
}`,"code/gridlayout.css","code","2018-08-13");
search.addDoc(
`<html>
<link rel=stylesheet href=/code/gridlayout.css/>
<div class=grid-body>
    <div class=grid-wrapper>
        <aside class=grid-box id=grid-search>SEARCH</aside>
        <aside class=grid-box id=grid-links>LINKS</aside>
        <header class=grid-box id=grid-header>HEADER</header>
        <nav class=grid-box id=grid-nav>NAV</nav>
        <div class=grid-box id=grid-content>CONTENT</div>
        <footer class=grid-box id=grid-footer>FOOTER</footer>
    </div>
</div>
</html>
`,"code/gridlayout.html","code","2018-08-13");
search.addDoc(
`      1 100%;
      1 1000px)
      1 110%;
      1 1px
      1 2fr
     13 {
     13 }
      1 30px;
      1 444;
      1 500px)
      1 500px;
      1 5px
      1 black;
      1 border:
      1 border-radius:
      1 center;
      1 color:
      1 content
      1 content;
      1 display:
      1 font-size:
      1 footer content .;
      1 footer content;
      1 grid;
      1 .grid-body
      1 .grid-box
      1 grid-content
      1 grid-footer
      1 grid-gap:
      1 grid-header
      1 grid-links
      1 grid-nav
      1 grid-search
      1 header
      1 header;
      1 header header
      1 header header header
      1 line-height:
      1 links
      1 links;
      1 middle;
      1 nav
      1 nav;
      1 nav content
      1 nav content .
      1 search
      1 search;
      1 search links
      1 search links links
      1 solid
      1 text-align:
      1 vertical-align:
      2 10px;
      2 120px
      2 1fr;
      2 5px;
      2 background-color:
      2 fff;
      2 footer;
      2 grid-template-columns:
      2 height:
      2 margin:
      2 @media
      2 (min-width:
      3 0;
      3 40px;
      3 grid-template-areas:
      3 grid-template-rows:
      3 .grid-wrapper
      3 padding:
      4 1fr
      6 grid-area:
      7 40px
`,"code/newfilename","code","");
search.addDoc(
`!/usr/bin/python
f= open(gridlayout.css,r)
text = f.read()
 Cleaning text and lower-casing all words
for char in '-.,\n':
    text=text.replace(char,' ')
text = text.lower()
 split returns a list of words delimited by sequences of whitespace (including tabs, newlines, etc, like re's \s) 
word_list = text.split()
 Initializing Dictionary
d = {}
 Count number of times each word comes up in list of words (in dictionary)
for word in word_list:
    if word not in d:
        d[word] = 0
    d[word] += 1
word_freq = []
for key, value in d.items():
    word_freq.append((value, key))
word_freq.sort(reverse=True) 
for x in word_freq:
  print(x)`,"code/word-counter.py","code","");
search.addDoc(
` cat will read from file
 xargs -n1 will put one word on each line, that's a number 1
 sort will sort the output
 uniq -c will count occurances
 sort -g will numeric reverse 
cat gridlayout.css | xargs -n1 | sort | uniq -c | sort -gr
`,"code/word-counter.sh","code","");
