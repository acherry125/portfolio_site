var express = require('express'),
	https = require('https'),
	http = require('http'),
	app = express();

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// loading project module
var init = require('./scripts/app.js');
// passing project module the express module
init(app);

var port      = 80;


http.createServer(app).listen(port);
