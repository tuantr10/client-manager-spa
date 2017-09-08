const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(':memory:', (err) => {
	if (err) {
		return console.error(err.message)
	}
	console.log('Connected to the in-memory SQlite database.')

	db.serialize(() => {
		db.run("CREATE TABLE if not exists employee_info (name VARCHAR(255), address VARCHAR(255), phone VARCHAR(255), email VARCHAR(255), salary REAL)");
	});

	db.close();
});

exports.init = (app) => {
	app.get('/api/me', (req, res) => {
		res.json({})
	})
}