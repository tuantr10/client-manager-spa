import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmployeeForm from './employeeForm';
import EmployeesTable from './employeesTable';
import Navbar from './navbar';
import Notifications from 'react-notification-system-redux';
import _ from 'underscore';

import { createEmployee, fetchEmployees } from '../actions/employeeActions';

class Layout extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isCreatingNewEmployee: false,
			newEmployee: {},
		};
	}
	componentWillMount() {
		this.props.dispatch(fetchEmployees());
	}
	createNewEmployee() {
		this.setState({
			isCreatingNewEmployee: true
		});
	}
	saveNewEmployee(newEmployee) {
		this.props.dispatch(createEmployee(newEmployee));
	}
	cancelNewEmployee() {
		this.setState({
			isCreatingNewEmployee: false
		});
	}
	componentWillReceiveProps(nextProps) {
		if (_.isEmpty(nextProps.err)) {
			this.setState({
				isCreatingNewEmployee: false,
				newEmployee: {}
			});
		} else {
			//error handling
		}
	}
	render() {
		const { isCreatingNewEmployee, newEmployee } = this.state;
		const { employeesHash, employeesId, err, notifications, editingId } = this.props;
		let CreateNewEmployeeRow, CreateNewEmployeeButton;
		if (isCreatingNewEmployee) {
			CreateNewEmployeeRow = 
				<tbody>
					<EmployeeForm
						employee = { newEmployee }
						saveEmployee = { this.saveNewEmployee.bind(this) }
						cancelEmployee = { this.cancelNewEmployee.bind(this) }
					/>
				</tbody>
		} else {
			CreateNewEmployeeButton = <button className="btn btn-sm btn-primary" onClick={() => this.createNewEmployee()}>Add New Employee <i className="glyphicon glyphicon-plus"></i></button>
		}
		return (
			<div>
				<h2 className="text-center">Mothership | Employee Manager</h2>
				<Navbar CreateNewEmployeeButton= { CreateNewEmployeeButton }/>
				<EmployeesTable CreateNewEmployeeRow= { CreateNewEmployeeRow }
								employeesHash={ employeesHash }
								employeesId={ employeesId}
								editingId={ editingId } />
				<Notifications notifications={notifications} />
			</div>
		);
	}
}

export default connect((store) => {
	return {
		err: store.employees.err,
		employeesHash: store.employees.employeesHash,
		employeesId: store.employees.employeesId,
		editingId: store.employees.editingId,
		notifications: store.notifications
	}
})(Layout);