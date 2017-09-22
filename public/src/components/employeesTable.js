import React, { Component } from 'react';
import { connect } from 'react-redux';
import Employee from './employee';
import _ from 'underscore';
import Notifications from 'react-notification-system-redux';

class EmployeesTable extends Component {
	render() {
		const { CreateNewEmployeeRow, employeesHash, employeesId, err, notifications } = this.props;

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
							<Employee key={ employeeId } employee={ employeesHash[employeeId] } />
						))}
					</tbody>
				</table>
				<Notifications notifications={notifications} />
			</div>	
		);
	}
}

export default connect((store) => {
	return {
		employeesId: store.employees.employeesId,
		employeesHash: store.employees.employeesHash,
		err: store.err,
		notifications: store.notifications
	}
})(EmployeesTable);