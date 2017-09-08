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
	let formData = {
		$name: req.body.name,
		$address: req.body.address,
		$phone: req.body.phone,
		$email: req.body.email,
		$salary: req.body.salary
	};
	db.run(`INSERT INTO employee_info(name, address, phone, email, salary)
			VALUES($name, $address, $phone, $email, $salary)`,
	 		formData, (err) => {
				if (err) return console.log(err.message);
				res.json(formData);
			});
};