import React, { Component } from 'react';
import Employee from './employee';
import EmployeeStore from '../store';
import EmployeeAction from '../actions/employeeActions';

export default class Employees extends Component {
	render() {
		const { employees } = this.props;
		return (
			<div>
				<h2 className="text-center">Mothership | Employee Manager</h2>
				<button className="btn btn-sm btn-primary">Add New Employee</button>
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
							{employees.map(employee => (
								<Employee key={ employee.id } employee={ employee } />
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}