# reqlimit
A utility to limit the number of requests per second.

See the examples directory for some usages.

# API

## Constructor reqlimit(maxRps:number):reqlimit
maxRps is the highest number of requests/second that you want reqlimit to allow.

## reqlimit.check(key:object):object
Where key is any suitable identifer for a recurring request. This function calculates
requests per second, and marks an entry as "blocked" if the calculation exceeds
maxRps. If an entry is blocked, this function stops its calculations.

The returned object contains the following properties:
```
	count	// The number of requests made by this entry
	last	// A timestamp of the last request made (in milliseconds since epoch)
	rps		// Current request/second
	block	// Boolean indicating if the entry exceeded maxRps
```

## reqlimit.release(timeout:number)
Removes entries that are older than timeout (in seconds).
