const express = require('express');
const app = express();
const morgan = require('morgan');
const desktopApp = require('./apps/desktop/module');
const apiApp = require('./apps/api/module');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan('combined'));

app.use(express.static('public'));

desktopApp.init(app);
apiApp.init(app);

let db = new sqlite3.Database('db/employees.db', (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Connected to employees database');

	db.serialize(() => {
		db.run("CREATE TABLE if not exists employee_info(`name` VARCHAR ( 255 ) NOT NULL, `address` VARCHAR ( 255 ) NOT NULL, `phone` VARCHAR ( 255 ) NOT NULL, `email` VARCHAR ( 255 ) NOT NULL, `salary` REAL NOT NULL, `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE)");
	});
});

process.on('SIGINT', () => {
	db.close();
});


app.listen(8081, () => {
	console.log('app listening on port 8081!');
});
