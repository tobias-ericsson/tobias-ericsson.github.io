var request = require('superagent');

console.log('test superagent');
request.get('/user/1', function(res){
	console.log('response', res);
});
