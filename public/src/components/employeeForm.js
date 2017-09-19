import React, { Component } from 'react';

class EmployeeForm extends Component {
	handleChange(prop, event) {
		let { employee } = this.props;
		employee[prop] = event.target.value;
	}
	render() {
		const { employee, saveEmployee, deleteEmployee } = this.props;
		return (
			<tr>
				<td>{ employee.id } </td>
				<td><input type="text" name="name" defaultValue={ employee.name } onChange={ this.handleChange.bind(this, 'name') }/></td>
				<td><input type="email" name="email" defaultValue={ employee.email } onChange={ this.handleChange.bind(this, 'email') } /></td>
				<td><input type="text" name="address" defaultValue={ employee.address } onChange={ this.handleChange.bind(this, 'address') }/></td>
				<td><input type="number" name="phone" defaultValue={ employee.phone } onChange={ this.handleChange.bind(this, 'phone') }/></td>
				<td><input type="number" name="salary" defaultValue={ employee.salary } onChange={ this.handleChange.bind(this, 'salary') }/></td>
				<td><button className="btn btn-sm btn-success" onClick={() => { saveEmployee(employee) }}>Save</button></td>
				<td><button className="btn btn-sm btn-danger" onClick={() => { deleteEmployee(employee.id) }}>Remove</button></td>
			</tr>
		)
	}
}

export default EmployeeForm;