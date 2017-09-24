exports.init = (app) => {
	const employees = require('./controllers/employees');

	app.route('/api/employees')
		.get(employees.list)
		.post(employees.validatePost, employees.create);

	app.route('/api/employees/:employeeId')
		.get(employees.read)
		.put(employees.validatePut, employees.update)
		.delete(employees.delete);
};