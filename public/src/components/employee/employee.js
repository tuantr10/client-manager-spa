import React, { Component } from 'react';
import { deleteEmployee, fetchEmployees, updateEmployee, editEmployee, toggleEditEmployee } from '../../actions/employeeActions';
import EmployeeForm from './employeeForm';
import EmployeeInfo from './employeeInfo';
import _ from 'underscore';
import { connect } from 'react-redux';

class Employee extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isEditing: this.props.isEditing
		};
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ isEditing: nextProps.isEditing });
	}
	deleteEmployee(employeeId) {
		this.props.dispatch(deleteEmployee(employeeId));
	}
	toggleEditEmployee(employeeId) {
		this.setState({ isEditing: !this.state.isEditing }, () => {
			this.props.dispatch(toggleEditEmployee(employeeId));
		});
	}
	updateEmployee(employee) {
		this.props.dispatch(updateEmployee(employee));
	}
	render() {
		const { employee } = this.props;
		if (this.state.isEditing) {
			return (
				<EmployeeForm
					employee = { employee }
					saveEmployee = { this.updateEmployee.bind(this) }
					cancelEmployee = { this.toggleEditEmployee.bind(this) }
				/>
			);
		} else {
			return (
				<EmployeeInfo
					employee = { employee }
					toggleEditEmployee = { this.toggleEditEmployee.bind(this) }
					deleteEmployee = { this.deleteEmployee.bind(this) }
				/>
			);
		}
	}
}

export default connect((store) => {
	return {}
})(Employee);