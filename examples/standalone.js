var limiter = require('../reqlimit')(100);

// Request away!
setInterval(function () {
	var reqData = limiter.check('some key');

	if (!reqData.block) {
		console.log(reqData);
	}
}, 70);

setInterval(function () {
	// Release requests older than 5 seconds.
	limiter.release(5);
}, 5000);
