import React, { Component } from 'react';
import { deleteEmployee, fetchEmployees, editEmployee } from '../actions/employeeActions';
import EmployeeForm from './employeeForm';
import { connect } from 'react-redux';

class Employee extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isEditing: false
		};
	}
	deleteEmployee(employeeId) {
		this.props.dispatch(deleteEmployee(employeeId));
	}
	editEmployee(employeeId) {
		this.setState({ isEditing: true });
	}
	saveEditedEmployee(employee) {
		this.setState({ isEditing: false }, () => {
			this.props.dispatch(editEmployee(employee));
		});
	}
	render() {
		const { employee } = this.props;
		if (this.state.isEditing) {
			return (
				<EmployeeForm
					employee = { employee }
					saveEmployee = { this.saveEditedEmployee.bind(this) }
					deleteEmployee = { this.deleteEmployee.bind(this) }
				/>
			);
		} else {
			return (
				<tr>
					<td>{ employee.id } </td>
					<td>{ employee.name }</td>
					<td>{ employee.email } </td>
					<td>{ employee.address }</td>
					<td>{ employee.phone }</td>
					<td>{ employee.salary }</td>
					<td><button className="btn btn-sm btn-primary" onClick={() => { this.editEmployee(employee.id) }}>Edit</button></td>
					<td><button className="btn btn-sm btn-danger" onClick={() => { this.deleteEmployee(employee.id) }}>Remove</button></td>
				</tr>
			);
		}
	}
}

export default connect((store) => {
	return {}
})(Employee);