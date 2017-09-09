exports.init = function(app) {
	var ect = require('ect')
	var viewPath = __dirname + '/views'

	app.set('view engine', 'ect')
	app.set('views', viewPath);

	app.engine('ect', ect({
		//cache: !config.debug,
		root: viewPath,
		ext: '.ect',
		open: '{%',
		close: '%}',
	}).render);

	app.get('/', function (req, res) {
		res.render('index')
	})
}