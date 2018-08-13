var dom = function () {

    function textToHtml(text) {
        var html = '';
        var lines = text.split("\n");
        var name = '';
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].indexOf("http") != -1) {
                if (lines[i].indexOf("http://") != -1) {
                    name = lines[i].substring(7);
                }
                if (lines[i].indexOf("https://") != -1) {
                    name = lines[i].substring(8);
                }
                html = html + "<p><a href='" + lines[i] + "'>" + name + "</a></p>"
            } else {
                html = html + "<br/>"
            }
        }
        return html
    }

    function fillElement(elemId, html) {
        var elem = document.getElementById(elemId);
        elem.innerHTML = html;
    }

    function toggleFullScreen(elem) {
        let grid = document.getElementsByClassName('zone-wrapper')[0];
        grid.classList.toggle("fullScreenContent");
        console.log("toggle fullscreen");
        if (elem.innerHTML=='+') {
            elem.innerHTML = '-';
        } else {
            elem.innerHTML = '+'
        }
    }

    function stripFileEnding(path) {
        return path.substring(0, path.lastIndexOf('.')) || path;
    }

    function minusToSpace(path) {
        return path.replace(/-/g, ' ');
    }

    function searchResultToHtml(elem) {
        const preLine = "<p><a href='";
        const preLine2 = "' onclick='ajax.fetch(\"";
        const postLine = '</a></p>';

        let file = elem.doc.title;
        let title = minusToSpace(stripFileEnding(file));

        function toHtml(folder, file, title) {
            return preLine + folder + file + preLine2 + folder + file + "\"); return false;'>" +
                title + '<span class="gitDate"> ' + elem.doc.date + '</span>' + postLine + '\n';
        }

        switch (elem.doc.type) {
            case 'link':
                return (typeof marked != 'undefined') ? marked(elem.doc.body) : elem.doc.body;
                break;
            case 'note':
                return toHtml('/notes/', file, title);
                break;
            case 'script':
                return toHtml('/bin/', file, file);
                break;
            case 'code':
                return toHtml('/code/', file, file);
                break;
            default:
                return toHtml('/notes/', file, title);

        }
    }

    function find() {
        let searchInput = document.getElementById("searchInput").value;
        if (searchInput.length > 1) {
            let data = search.search(searchInput);
            /*console.log("data", data);*/
            let html = '';
            data.forEach(function (elem) {
                html = html + searchResultToHtml(elem);
            });
            document.getElementById('zone-content').innerHTML = html;
        }
    }

    function fillContent(contentType, content) {
        let html = content;
        console.log("displaying", contentType);
        switch (contentType) {
            case 'md':
                html = (typeof marked != 'undefined') ? marked(html) : html;
                html = hideURLProtocol(html);
                document.getElementById('zone-content').innerHTML = html;
                break;
            case 'sh':
                html = preCode(html);
                document.getElementById('zone-content').innerHTML = html;
                break;
            case 'html':
                document.getElementById('zone-content').innerHTML = html;
                break;
            case 'index.html':
            case '':
                document.getElementById('leftMenu').innerHTML = html;
                break;
            default:
                html = preCode(html);
                document.getElementById('zone-content').innerHTML = html;
                break;

        }

        //prettyprinting code blocks
        if (typeof PR != 'undefined') {
            var allTags = document.getElementById('zone-content').getElementsByTagName("pre");
        
            for (var i = 0, len = allTags.length; i < len; i++) {
               allTags[i].classList.add("prettyprint");
            }
            PR.prettyPrint();
        }       
    }

    function hideURLProtocol(text) {
        const regex = />http(s|):\/\//gm;
        return text.replace(regex, '>');
    }

    function preCode(text) {
        return '<pre><code>' + text + '</code></pre>';
    }

    function loadingSpinner(spinner) {
        spinner.classList.add("spinner");
        setTimeout(function() {
            spinner.classList.remove("spinner");
        }, 5000);
    }

    //eventListeners
    var oldTarget;

    document.addEventListener('click', function (e) {
        e = e || window.event;
        let target = e.target || e.srcElement,
            text = target.textContent || target.innerText;

        let href = target.getAttribute("href");

        //for img in a
        if (!href) {
            href = target.parentElement.getAttribute("href");
        }    

        console.log(text + " selected, href", href);
        if (href && href.indexOf("http") == -1) {
            if (oldTarget) oldTarget.classList.remove("lastSelected");
            target.classList.add("lastSelected");
            oldTarget = target;

            if (href!='#') {
                ajax.fetch(href);
            }
            e.preventDefault();
            return false;
        }
        return true;
    }, false);

    return {
        textToHtml: textToHtml,
        fillElement: fillElement,
        toggleFullScreen: toggleFullScreen,
        find: find,
        fillContent: fillContent
    }
}
();
