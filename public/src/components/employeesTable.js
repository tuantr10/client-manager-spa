import React, { Component } from 'react';
import Employee from './employee';
import _ from 'underscore';

class EmployeesTable extends Component {
	render() {
		const { CreateNewEmployeeRow, employeesHash, employeesId, editingId } = this.props;

		return (
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
							<Employee
								key={ employeeId }
								employee={ employeesHash[employeeId] }
								isEditing={ _.contains(editingId, employeeId )} />
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default EmployeesTable;