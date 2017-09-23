import React, { Component } from 'react';

class EmployeeForm extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			employee: {...this.props.employee}
		};
	}
	handleChange(prop, event) {
		let { employee } = this.state;
		employee[prop] = event.target.value;
	}
	render() {
		const { saveEmployee, cancelEmployee } = this.props;
		const { employee } = this.state;
		return (
			<tr>
				<td>{ employee.id }</td>
				<td><input type="text" name="name" defaultValue={ employee.name } onChange={ this.handleChange.bind(this, 'name') }/></td>
				<td><input type="email" name="email" defaultValue={ employee.email } onChange={ this.handleChange.bind(this, 'email') } /></td>
				<td><input type="text" name="address" defaultValue={ employee.address } onChange={ this.handleChange.bind(this, 'address') }/></td>
				<td><input type="number" name="phone" defaultValue={ employee.phone } onChange={ this.handleChange.bind(this, 'phone') }/></td>
				<td><input type="number" name="salary" defaultValue={ employee.salary } onChange={ this.handleChange.bind(this, 'salary') }/></td>
				<td>
					<button className="btn btn-sm btn-success" onClick={() => { saveEmployee(employee) }}>
						Save <i className="glyphicon glyphicon-ok"></i>
					</button>
					&nbsp;
					<button className="btn btn-sm btn-danger" onClick={() => { cancelEmployee(employee.id) }}>
						Cancel <i className="glyphicon glyphicon-remove"></i>
					</button>
				</td>
			</tr>
		)
	}
}

export default EmployeeForm;