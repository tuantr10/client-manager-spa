import React, { Component } from 'react';

class Employee extends Component {
	render() {
		const { employee } = this.props;
		return (
			<span>{ employee.id } | { employee.name } | { employee.email } </span>
		);
	}
}

export default Employee;