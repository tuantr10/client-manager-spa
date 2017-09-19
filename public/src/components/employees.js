import React, { Component } from 'react';
import { connect } from 'react-redux';

import Employee from './employee';
import EmployeeForm from './employeeForm';
import Navbar from './navbar';

import EmployeeStore from '../store';
import { createEmployee } from '../actions/employeeActions';
import _ from 'underscore';

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
		const { employeesHash, employeesId } = this.props;
		const { isCreatingNewEmployee } = this.state;
		let CreateNewEmployeeRow, CreateNewEmployeeButton;
		let { newEmployee } = this.state;

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
				<div className="table-responsive">
					<table className='table table-striped'>
						<thead>
							<tr className="info">
								<th>#</th>
								<th>Name</th>
								<th>Email</th>
								<th>Address</th>
								<th>Phone</th>
								<th>Salary</th>
								<th colSpan={ 2 } className="text-center">Actions</th>
							</tr>
						</thead>
						{ CreateNewEmployeeRow }
						<tbody>
							{_.map(employeesId, (employeeId) => (
								<Employee key={ employeeId } employee={ employeesHash[employeeId] } />
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default connect((store) => {
	return {}
})(Employees);