
// passing our module the express module
module.exports = function(app) {

	app.get(['/', '/home'], renderHomePage);
	app.get('*', renderErrorPage);

	function renderHomePage(req, res) {
		res.status(200).sendFile('index.html', {root: __dirname + '/../public/' });
	}

	function renderErrorPage(req,res) {
		res.status(404).sendFile('index.html', {root: __dirname + '/../public/' });
	};


};