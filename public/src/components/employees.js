import React, { Component } from 'react';
import Employee from './employee';
import EmployeeStore from '../store';
import EmployeeAction from '../actions/employeeActions';

export default class Employees extends Component {
	render() {
		const { employees } = this.props;
		return (
			<div className="table-responsive">			
				<table className='table table-striped'>
					<thead>
						<tr className="info">
							<th>ID</th>
							<th>Name</th>
							<th>Email</th>
							<th>Address</th>
							<th>Phone</th>
							<th>Salary</th>
						</tr>
					</thead>
					<tbody>
						{employees.map(employee => (
							<Employee key={ employee.id } employee={ employee } />
						))}
					</tbody>
				</table>
			</div>
		);
	}
}