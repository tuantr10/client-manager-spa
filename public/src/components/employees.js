import React, { Component } from 'react';
import { connect } from 'react-redux';
import Employee from './employee';
import EmployeeStore from '../store';
import { createEmployee } from '../actions/employeeActions';
import _ from 'underscore';

class Employees extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isCreatingNewEmployee: false,
			newEmployee: {}
		};
	}
	createNewEmployee() {
		this.setState({
			isCreatingNewEmployee: true
		});
	}
	saveNewEmployee(newEmployee) {
		this.props.dispatch(createEmployee(newEmployee));
		this.setState({
			isCreatingNewEmployee: false,
			newEmployee: {}
		});
	}
	handleChange(prop, event) {
		let { newEmployee } = this.state;
		newEmployee[prop] = event.target.value;
	}
	
	cancelNewEmployee() {
		this.setState({
			isCreatingNewEmployee: false
		});
	}
	render() {
		const { employeesHash } = this.props;
		const { isCreatingNewEmployee } = this.state;
		let CreateNewEmployeeRow, CreateNewEmployeeButton;
		let { newEmployee } = this.state;

		if (isCreatingNewEmployee) {
			CreateNewEmployeeRow = 
				<tbody>
					<tr>
						<td></td>
						<td><input type="text" name="name" placeholder="Name" defaultValue={ newEmployee.name } onChange={ this.handleChange.bind(this, 'name') }/></td>
						<td><input type="email" name="email" placeholder="Email" defaultValue={ newEmployee.email } onChange={ this.handleChange.bind(this, 'email') } /></td>
						<td><input type="text" name="address" placeholder="Address" defaultValue={ newEmployee.address } onChange={ this.handleChange.bind(this, 'address') }/></td>
						<td><input type="number" name="phone" placeholder="Phone" defaultValue={ newEmployee.phone } onChange={ this.handleChange.bind(this, 'phone') }/></td>
						<td><input type="number" name="salary" placeholder="Salary" defaultValue={ newEmployee.salary } onChange={ this.handleChange.bind(this, 'salary') }/></td>
						<td><button className="btn btn-sm btn-success" onClick={() => { this.saveNewEmployee(newEmployee) }}>Create</button></td>
						<td><button className="btn btn-sm btn-danger" onClick={() => { this.cancelNewEmployee() }}>Cancel</button></td>
					</tr>
				</tbody>
		} else {
			CreateNewEmployeeButton = <button className="btn btn-sm btn-primary" onClick={() => this.createNewEmployee()}>Add New Employee</button>
		}
		return (
			<div>
				<h2 className="text-center">Mothership | Employee Manager</h2>
				<div className="form-group">
					{ CreateNewEmployeeButton }
				</div>
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
						<tbody>
							{_.map(employeesHash, (employee, employeeId) => (
								<Employee key={ employeeId } employee={ employee } />
							))}
						</tbody>
						{ CreateNewEmployeeRow }
					</table>
				</div>
			</div>
		);
	}
}

export default connect((store) => {
	return {
		employeesHash: store.employeesHash,
		err: store.err
	}
})(Employees);