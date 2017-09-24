import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmployeeForm from './employee/employeeForm';
import EmployeesTable from './employee/employeesTable';
import Navbar from './navbar/navbar';
import Notifications from 'react-notification-system-redux';
import _ from 'underscore';

import { createEmployee, fetchEmployees, toggleCreateEmployee } from '../actions/employeeActions';

class Layout extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			newEmployee: {
				id: 0
			},
		};
	}
	componentWillMount() {
		this.props.dispatch(fetchEmployees());
	}
	saveNewEmployee(newEmployee) {
		this.props.dispatch(createEmployee(newEmployee));
	}
	toggleCreateEmployee() {
		this.props.dispatch(toggleCreateEmployee(!this.props.isCreatingEmployee));
	}
	render() {
		const { newEmployee } = this.state;
		const { notifications, isCreatingEmployee, editingErrors } = this.props;
		let CreateNewEmployeeRow, CreateNewEmployeeButton;
		if (isCreatingEmployee) {
			CreateNewEmployeeRow = 
				<tbody>
					<EmployeeForm
						employee = { newEmployee }
						saveEmployee = { this.saveNewEmployee.bind(this) }
						cancelEmployee = { this.toggleCreateEmployee.bind(this) }
						editingError = { editingErrors[newEmployee.id] }
					/>
				</tbody>
		} else {
			CreateNewEmployeeButton = <button className="btn btn-sm btn-primary" onClick={() => this.toggleCreateEmployee()}>Add New Employee <i className="glyphicon glyphicon-plus"></i></button>
		}
		return (
			<div>
				<h2 className="text-center">Mothership | Employee Manager</h2>
				<Navbar CreateNewEmployeeButton = { CreateNewEmployeeButton } />
				<EmployeesTable CreateNewEmployeeRow = { CreateNewEmployeeRow } />
				<Notifications notifications = { notifications } />
			</div>
		);
	}
}

export default connect((store) => {
	return {
		notifications: store.notifications,
		isCreatingEmployee: store.employees.isCreatingEmployee,
		editingErrors: store.employees.editingErrors
	}
})(Layout);