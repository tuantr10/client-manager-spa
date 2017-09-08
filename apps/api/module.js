exports.init = (app) => {
	app.get('/api/me', (req, res) => {
		res.json({})
	})
}