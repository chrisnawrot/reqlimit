var http = require('http');
var url = require('url');
var limiter = require('../reqlimit')(100);

http.createServer(function (req, res) {
	if (url.parse(req.url).path != '/') {
		res.writeHead(404);
		res.end('Not found');
	}

	var reqData = limiter.check(req.socket.remoteAddress);

	if (!reqData.block) {
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(reqData));
	} else {
		res.writeHead(400);
		res.end('STOP IT!');
	}
}).listen(3000);

setInterval(function () {
	limiter.release(5);	
}, 5000);

console.log('OK, now browse to http://localhost:3000 and refresh a bunch.')