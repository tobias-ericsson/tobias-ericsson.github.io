//requires marked

var ajax = function () {

    function get(path) {

	if (!path.endsWith('.html')) {
            path=path+"/index.html";
        }
	console.log("fetching "+path);
	console.log("c-url "+window.location.href);
	
        fetch(path).then(function (response) {
            if (response.ok) {
                return response.text();
            } else {
                console.log("failed",response);
                return Promise.reject('something went wrong! '+ response.status);
            }
        }).then(function (data) {
            console.log('data is', data);
            dom.fillContent(getContentType(path),data);
        }).catch(function (error) {
                /*console.log('error is', error);*/
                alert(error);
            }
        );
        return false;
    }

    function getContentType(path) {
        if (path.endsWith('index.html')) {
            return 'index.html';
        }
        if (path.endsWith('menu.html')) {
            return 'index.html';
        }

        let dotIndex = path.lastIndexOf('.');
        if (dotIndex >1) {
           return path.substring(dotIndex+1, path.length);
        } else {
            return '';
        }
    }

    return {
        fetch: get
    }
}();