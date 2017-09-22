const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/employees.db');
const { check, validationResult } = require('express-validator/check');

exports.list = (req, res) => {
	let sql = `SELECT * FROM employee_info`;
	let params = {};
	if (req.query.q) {
		sql += ` WHERE name LIKE '%'||$keyword||'%' OR address LIKE '%'||$keyword||'%' or email LIKE '%'||$keyword||'%'`;
		params.$keyword = req.query.q;
	}
	if (req.query.sort) {
		let sort = req.query.sort.split('-');
		sql += ` ORDER BY `;
		if(sort.length == 1) {
			sql += sort[0] + ` ASC`;
		} else {
			sql += sort[1] + ` DESC`;
		}
	}
	db.all(sql, params, (err, rows) => {
		if (err) return res.status(500).send({error: err.message});
		res.json(rows);
	});
};

exports.create = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ errors: errors.mapped() });
	}
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
		if (err) return res.status(500).send({error: err.message});
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
		if (err) return res.status(500).send({error: err.message});
		if (row) {
			res.json(row);
		} else {
			res.json({});
		}
	});
};

exports.update = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ errors: errors.mapped() });
	}
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
		if (err) return res.status(500).send({error: err.message});
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
		if (err) return res.status(500).send({error: err.message});
		res.json(req.params.employeeId);
	});
};

exports.validate = [
	check('name').exists().withMessage('Name Not Filled'),
	check('email').exists().isEmail().withMessage('Email Is Not Filled Or Has Wrong Format'),
	check('phone').exists().isMobilePhone('ja-JP').withMessage('Phone Is Not Filled Or Has Wrong Format'),
	check('salary').exists().isFloat().withMessage('Salary Is Not Filled')
];