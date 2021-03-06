const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/employees.db');
const { check, validationResult } = require('express-validator/check');
const _ = require('underscore');

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
		if (err) return res.status(500).send({errors: {internal: err.message}});
		res.json(rows);
	});
};

exports.create = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ errors: errors.mapped(), id: 0 });
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
		if (err) return res.status(500).send({errors: {internal: err.message}});
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
		if (err) return res.status(500).send({errors: {internal: err.message}});
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
		return res.status(422).send({ errors: errors.mapped(), id: req.params.employeeId });
	}
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
		if (err) return res.status(500).send({errors: {internal: err.message}});
		res.json({
			name: req.body.name,
			address: req.body.address,
			phone: req.body.phone,
			email: req.body.email,
			salary: parseFloat(req.body.salary),
			id: parseInt(req.params.employeeId)
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
		res.json(parseInt(req.params.employeeId));
	});
};

exports.validate = [
	check('name')
		.isLength({ min: 1 }).withMessage('Name is empty'),
	check('address')
		.isLength({ min: 1}).withMessage('Address is empty'),
	check('phone')
		.isLength({ min: 1 }).withMessage('Phone is empty')
		.isMobilePhone('ja-JP').withMessage('Phone has wrong format'),
	check('salary')
		.isLength({ min: 1 }).withMessage('Salary is empty')
		.isFloat().withMessage('Salary has wrong format'),
	check('email')
		.isLength({ min: 1 }).withMessage('Email is empty')
		.isEmail().withMessage('Email has wrong format')
		.custom((value, { req }) => {
			return findEmployeeByEmail(value, req.params.employeeId).then((result) => {
				return result;
			});
		}).withMessage('Email has already been used')
];

const findEmployeeByEmail = (email, id) => {
	return new Promise((resolve, reject) => {
		const sql = `SELECT id, email FROM employee_info WHERE email = $email LIMIT 1`;
		db.get(sql, {$email: email}, (err, row) => {
			if (err) return reject(Error(err));
			if (row && id != row.id) {
				reject(Error('Email has already been used'));
			} else {
				resolve(true);
			}
		});
	})
}