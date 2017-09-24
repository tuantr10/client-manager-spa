import React, { Component } from 'react';

class EmployeeInfo extends Component {
	render () {
		const { toggleEditEmployee, deleteEmployee, employee } = this.props;
		return (
			<tr>
				<td>{ employee.id }</td>
				<td>{ employee.name }</td>
				<td>{ employee.email }</td>
				<td>{ employee.address }</td>
				<td>{ employee.phone }</td>
				<td>{ employee.salary }</td>
				<td><button className="btn btn-sm btn-primary" onClick={() => { toggleEditEmployee(employee.id) }}>
						Edit <i className="glyphicon glyphicon-edit"></i>
					</button>
					<button className="btn btn-sm btn-danger" onClick={() => { deleteEmployee(employee.id) }}>
						Remove <i className="glyphicon glyphicon-trash"></i>
					</button>
				</td>
			</tr>
		)
	}
}

export default EmployeeInfo;