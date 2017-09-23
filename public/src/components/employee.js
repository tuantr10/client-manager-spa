import React, { Component } from 'react';
import { deleteEmployee, fetchEmployees, updateEmployee, editEmployee, toggleEditEmployee } from '../actions/employeeActions';
import EmployeeForm from './employeeForm';
import _ from 'underscore';
import { connect } from 'react-redux';

class Employee extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isEditing: this.props.isEditing
		};
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ isEditing: nextProps.isEditing });
	}
	deleteEmployee(employeeId) {
		this.props.dispatch(deleteEmployee(employeeId));
	}
	toggleEditEmployee(employeeId) {
		this.setState({ isEditing: !this.state.isEditing }, () => {
			this.props.dispatch(toggleEditEmployee(employeeId));
		});
	}
	updateEmployee(employee) {
		this.props.dispatch(updateEmployee(employee));
	}
	render() {
		const { employee } = this.props;
		if (this.state.isEditing) {
			return (
				<EmployeeForm
					employee = { employee }
					saveEmployee = { this.updateEmployee.bind(this) }
					cancelEmployee = { this.toggleEditEmployee.bind(this) }
				/>
			);
		} else {
			return (
				<tr>
					<td>{ employee.id }</td>
					<td>{ employee.name }</td>
					<td>{ employee.email }</td>
					<td>{ employee.address }</td>
					<td>{ employee.phone }</td>
					<td>{ employee.salary }</td>
					<td><button className="btn btn-sm btn-primary" onClick={() => { this.toggleEditEmployee(employee.id) }}>Edit</button></td>
					<td><button className="btn btn-sm btn-danger" onClick={() => { this.deleteEmployee(employee.id) }}>Remove</button></td>
				</tr>
			);
		}
	}
}

export default connect((store) => {
	return {}
})(Employee);