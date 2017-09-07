exports.init = function(app) {
	app.get('/api/me', function (req, res) {
		res.json({})
	})
}