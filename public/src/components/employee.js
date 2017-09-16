import React, { Component } from 'react';

class Employee extends Component {
	render() {
		const { employee } = this.props;
		return (
			<tr>
				<td>{ employee.id } </td>
				<td>{ employee.name } </td>
				<td>{ employee.email } </td>
				<td>{ employee.address } </td>
				<td>{ employee.phone } </td>
				<td>{ employee.salary } </td>
			</tr>
		);
	}
}

export default Employee;