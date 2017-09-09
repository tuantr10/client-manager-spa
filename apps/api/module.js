exports.init = (app) => {
	const employees = require('./controllers/employees');

	app.route('/api/employees')
		.get(employees.list)
		.post(employees.create);

	app.route('/api/employees/:employeeId')
		.get(employees.read);
};