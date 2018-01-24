

exports.allowOrigin = function(req, res, next){ 
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
    next();
}

exports.allowMethods = function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    next();
}

exports.allowCrossTokenHeader = function(req, res, next) { 
	res.header('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, key'); 
	next();
}

// Remove the "X-Powered-By"
exports.removePoweredByExpress = function(req, res, next){
    res.removeHeader("X-Powered-By");
    next();
}


