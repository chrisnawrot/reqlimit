function ReqLimit(maxRps) {
	var _requests = {};

	function _record(key) {
		if (!_requests[key]) {
			_requests[key] = {
				last: Date.now(),
				count: 1,
				rps: 1,
				block: false
			};

			return;
		}

		if (_requests[key].block) {
			return;
		}

		var now = Date.now();
		var last = _requests[key].last;
		var count = _requests[key].count;

		count++;

		var rps = count / ((now - last) / 1000);

		_requests[key].last = now;
		_requests[key].count = count;
		_requests[key].rps = rps;
		_requests[key].block = rps >= maxRps;
	}

	return {
		check: function (key) {
			_record(key);
			return _requests[key];
		},
		release: function (timeout) {
			var now = Date.now();
			for (var key in _requests) {
				if (_requests.hasOwnProperty(key)) {
					setTimeout(function () {
						var last = _requests[key].last;
						if ((now - last) / 1000 >= timeout) {
							delete _requests[key];
						}
					}, 0);
				}
			}
		}
	}
}

module.exports = ReqLimit;