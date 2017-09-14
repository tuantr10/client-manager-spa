import React, { Component } from 'react';

class Employee extends Component {
	render() {
		let employee = this.props.employee;
		return (
			<span>{ employee.id } | { employee.name } | { employee.email } </span>
		);
	}
}

export default Employee;