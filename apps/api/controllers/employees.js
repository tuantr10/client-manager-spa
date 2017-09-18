const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/employees.db');

exports.list = (req, res) => {
	let sql = `SELECT * FROM employee_info`;
	if (req.query.q) {
		sql += ` WHERE name LIKE '%'||$keyword||'%' OR address LIKE '%'||$keyword||'%' or email LIKE '%'||$keyword||'%'`;
		params = {$keyword: req.query.q};
		db.all(sql, params, (err, rows) => {
			if (err) res.status(500).send({error: err.message});
			res.json(rows);
		});
	} else {
		db.all(sql,[], (err, rows) => {
			if (err) res.status(500).send({error: err.message});
			res.json(rows);
		});
	}
	
};

exports.create = (req, res) => {
	const sql = `INSERT INTO employee_info(name, address, phone, email, salary)
				VALUES($name, $address, $phone, $email, $salary)`;
	const data = {
		$name: req.body.name,
		$address: req.body.address,
		$phone: req.body.phone,
		$email: req.body.email,
		$salary: parseFloat(req.body.salary)
	};
	let insert = db.prepare(sql);
	insert.run(data, (err) => {
		if (err) res.status(500).send({error: err.message});
		res.json({
			name: req.body.name,
			address: req.body.address,
			phone: req.body.phone,
			email: req.body.email,
			salary: parseFloat(req.body.salary),
			id: insert.lastID
		});
	});
};

exports.read = (req, res) => {
	const sql = `SELECT * FROM employee_info WHERE id = $id`;
	db.get(sql, {$id: req.params.employeeId}, (err, row) => {
		if (err) res.status(500).send({error: err.message});
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
		$salary: parseFloat(req.body.salary),
		$id: req.params.employeeId
	};
	db.run(sql, data, function(err) {
		if (err) res.status(500).send({error: err.message});
		res.json({
			name: req.body.name,
			address: req.body.address,
			phone: req.body.phone,
			email: req.body.email,
			salary: parseFloat(req.body.salary),
			id: req.params.employeeId
		});
	});
};

exports.delete = (req, res) => {
	const sql = `DELETE FROM employee_info WHERE id = $id`;
	const data = {
		$id: req.params.employeeId
	};
	db.run(sql, data, function(err) {
		if (err) res.status(500).send({error: err.message});
		res.json(req.params.employeeId);
	});
};