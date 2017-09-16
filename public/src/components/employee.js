import React, { Component } from 'react';
import { deleteEmployee, fetchEmployees } from '../actions/employeeActions';
import { connect } from 'react-redux';

class Employee extends Component {
	delete_employee (employeeId) {
		this.props.dispatch(deleteEmployee(employeeId));
	}
	render() {
		const { employee } = this.props;
		return (
			<tr>
				<td>{ employee.id } </td>
				<td>{ employee.name } </td>
				<td>{ employee.email } </td>
				<td>{ employee.address } </td>
				<td>{ employee.phone } </td>
				<td>{ employee.salary } </td>
				<td><button className="btn btn-sm btn-primary">Edit</button></td>
				<td><button className="btn btn-sm btn-danger" onClick={() => { this.delete_employee(employee.id) }}>Remove</button></td>
			</tr>
		);
	}
}

export default connect((store) => {
	return {
		employees: store.employees,
		err: store.err
	}
})(Employee);