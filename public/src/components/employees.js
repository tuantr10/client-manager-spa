import React, { Component } from 'react';

import EmployeeForm from './employeeForm';
import EmployeesTable from './employeesTable';
import Navbar from './navbar';

import { createEmployee } from '../actions/employeeActions';

class Employees extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isCreatingNewEmployee: false,
			newEmployee: {},
		};
	}
	createNewEmployee() {
		this.setState({
			isCreatingNewEmployee: true
		});
	}
	saveNewEmployee(newEmployee) {
		this.setState({
			isCreatingNewEmployee: false,
			newEmployee: {}
		}, () => {
			this.props.dispatch(createEmployee(newEmployee));
		});
	}
	cancelNewEmployee() {
		this.setState({
			isCreatingNewEmployee: false
		});
	}
	render() {
		const { isCreatingNewEmployee, newEmployee } = this.state;
		let CreateNewEmployeeRow, CreateNewEmployeeButton;

		if (isCreatingNewEmployee) {
			CreateNewEmployeeRow = 
				<tbody>
					<EmployeeForm
						employee = { newEmployee }
						saveEmployee = { this.saveNewEmployee.bind(this) }
						deleteEmployee = { this.cancelNewEmployee.bind(this) }
					/>
				</tbody>
		} else {
			CreateNewEmployeeButton = <button className="btn btn-sm btn-primary" onClick={() => this.createNewEmployee()}>Add New Employee</button>
		}
		return (
			<div>
				<h2 className="text-center">Mothership | Employee Manager</h2>
				<Navbar CreateNewEmployeeButton= { CreateNewEmployeeButton }/>
				<EmployeesTable CreateNewEmployeeRow= { CreateNewEmployeeRow }/>
			</div>
		);
	}
}

export default Employees;