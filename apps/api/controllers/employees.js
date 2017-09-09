const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/employees.db');

exports.list = (req, res) => {
	const sql = `SELECT * FROM employee_info`;
	db.all(sql, [], (err, rows) => {
		if (err) throw err;
		res.json(rows);
	})
};

exports.create = (req, res) => {
	const sql = `INSERT INTO employee_info(name, address, phone, email, salary)
				VALUES($name, $address, $phone, $email, $salary)`;
	const data = {
		$name: req.body.name,
		$address: req.body.address,
		$phone: req.body.phone,
		$email: req.body.email,
		$salary: req.body.salary
	};
	db.run(sql, data, (err) => {
		if (err) return console.log(err.message);
		res.json(data);
	});
};

exports.read = (req, res) => {
	const sql = `SELECT * FROM employee_info WHERE id = $id`;
	db.get(sql, {$id: req.params.employeeId}, (err, row) => {
		if (err) return console.error(err.message);
		if (row) {
			res.json(row);
		} else {
			res.json({});
		}
	});
};

exports.update = (req, res) => {
	const sql = `UPDATE employee_info
				SET name = $name, address = $address, email = $email, phone = $phone, salary = $salary
				WHERE id = $id`;
	const data = {
		$name: req.body.name,
		$address: req.body.address,
		$phone: req.body.phone,
		$email: req.body.email,
		$salary: req.body.salary,
		$id: req.params.employeeId
	};
	db.run(sql, data, function(err) {
		if (err) return console.error(err.message);
		res.json(this.changes);
	});
};

exports.delete = (req, res) => {
	const sql = `DELETE FROM employee_info WHERE id = $id`;
	const data = {
		$id: req.params.employeeId
	};
	db.run(sql, data, function(err) {
		if (err) return console.error(err.message);
		res.json(this.changes);
	});
};