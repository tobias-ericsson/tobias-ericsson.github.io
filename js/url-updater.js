var urlUpdater = (function () {
  function update (path) {
    console.log('url ' + path)
    if (path.endsWith('menu.html') || path.endsWith('index.html')) {
    } else if (path.endsWith('content.html')) {
      history.pushState(null, '', '/')
    } else {
      history.pushState(null, '', '#' + path)
    }
  }
  return {
    update: update
  }
})()
