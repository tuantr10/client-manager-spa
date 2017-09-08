exports.init = (app) => {
	app.get('/', (req, res) => {
		res.send('Hello world');
	});
};