import React, { Component } from 'react';
import Employee from './employee';
import EmployeeStore from '../store';
import EmployeeAction from '../actions/employeeActions';
import _ from 'underscore';

class Employees extends Component {
	render() {
		const { employeesHash } = this.props;
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
							{_.map(employeesHash, (employee, employeeId) => (
								<Employee key={ employeeId } employee={ employee } />
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default Employees;