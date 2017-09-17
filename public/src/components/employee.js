import React, { Component } from 'react';
import { deleteEmployee, fetchEmployees, editEmployee } from '../actions/employeeActions';
import { connect } from 'react-redux';

class Employee extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isEditing: false
		};
	}
	deleteEmployee(employeeId) {
		this.props.dispatch(deleteEmployee(employeeId));
	}
	editEmployee(employeeId) {
		this.setState({ isEditing: true	})
	}
	saveEditedEmployee(employee) {
		this.setState({ isEditing: false })
		this.props.dispatch(editEmployee(employee));
	}
	handleChange(prop, event) {
		let { employee } = this.props;
		employee[prop] = event.target.value;
	}
	render() {
		const { employee } = this.props;
		if (this.state.isEditing) {
			return (
				<tr>
					<td>{ employee.id } </td>
					<td><input type="text" name="name" defaultValue={ employee.name } onChange={ this.handleChange.bind(this, 'name') }/></td>
					<td><input type="email" name="email" defaultValue={ employee.email } onChange={ this.handleChange.bind(this, 'email') } /></td>
					<td><input type="text" name="address" defaultValue={ employee.address } onChange={ this.handleChange.bind(this, 'address') }/></td>
					<td><input type="number" name="phone" defaultValue={ employee.phone } onChange={ this.handleChange.bind(this, 'phone') }/></td>
					<td><input type="number" name="salary" defaultValue={ employee.salary } onChange={ this.handleChange.bind(this, 'salary') }/></td>
					<td><button className="btn btn-sm btn-success" onClick={() => { this.saveEditedEmployee(employee) }}>Save</button></td>
					<td><button className="btn btn-sm btn-danger" onClick={() => { this.deleteEmployee(employee.id) }}>Remove</button></td>
				</tr>
			);
		} else {
			return (
				<tr>
					<td>{ employee.id } </td>
					<td>{ employee.name }</td>
					<td>{ employee.email } </td>
					<td>{ employee.address }</td>
					<td>{ employee.phone }</td>
					<td>{ employee.salary }</td>
					<td><button className="btn btn-sm btn-primary" onClick={() => { this.editEmployee(employee.id) }}>Edit</button></td>
					<td><button className="btn btn-sm btn-danger" onClick={() => { this.deleteEmployee(employee.id) }}>Remove</button></td>
				</tr>
			);
		}
	}
}

export default connect((store) => {
	return {
		employeesHash: store.employeesHash,
		err: store.err
	}
})(Employee);