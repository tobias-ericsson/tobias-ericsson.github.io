var request = require('superagent');

console.log('test superagent');
request.get('/notes/security/index.md', function(res){
	console.log('response', res);
	var contentDiv = document.getElementById("content");
	element.innerHTML = res.text;	
});
