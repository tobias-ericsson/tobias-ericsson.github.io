var urlUpdater = function () {

    function update(path) {
        console.log("url "+path);
        if(path.endsWith('menu.html') || path.endsWith('index.html')) {
            //history.pushState(null, '', location.href);
        } else {
            history.pushState(null, '', '#'+path);
        }
    }
    return {
        update: update
    }

}();