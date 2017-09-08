var express = require('express')
var app = express()

var desktopApp = require('./apps/desktop/module')
var apiApp = require('./apps/api/module')

desktopApp.init(app)
apiApp.init(app)

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('db/employees.db', (err) => {
	if (err) {
		return console.error(err.message)
	}
	console.log('Connected to employees database')

	db.serialize(() => {
		db.run("CREATE TABLE employee_info(`name` VARCHAR ( 255 ) NOT NULL, `address` VARCHAR ( 255 ) NOT NULL, `phone` VARCHAR ( 255 ) NOT NULL, `email` VARCHAR ( 255 ) NOT NULL UNIQUE, `salary` REAL NOT NULL, `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE)");
	});

	db.close();
})

app.listen(3000, () => {
	console.log('app listening on port 3000!')
})