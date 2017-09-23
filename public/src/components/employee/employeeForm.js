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
	handleKeyPress(event) {
		if (event.key === 'Enter') {
			this.props.saveEmployee(this.state.employee);
		}
	}
	render() {
		const { saveEmployee, cancelEmployee } = this.props;
		const { employee } = this.state;
		return (
			<tr>
				<td>{ employee.id }</td>
				<td><input type="text" name="name" placeholder="Name" defaultValue={ employee.name } onChange={ this.handleChange.bind(this, 'name') } onKeyPress={ this.handleKeyPress.bind(this) } /></td>
				<td><input type="email" name="email" placeholder="Email" defaultValue={ employee.email } onChange={ this.handleChange.bind(this, 'email') } onKeyPress={ this.handleKeyPress.bind(this) }/></td>
				<td><input type="text" name="address" placeholder="Address" defaultValue={ employee.address } onChange={ this.handleChange.bind(this, 'address') } onKeyPress={ this.handleKeyPress.bind(this) }/></td>
				<td><input type="number" name="phone" placeholder="Phone" defaultValue={ employee.phone } onChange={ this.handleChange.bind(this, 'phone') } onKeyPress={ this.handleKeyPress.bind(this) }/></td>
				<td><input type="number" name="salary" placeholder="Salary" defaultValue={ employee.salary } onChange={ this.handleChange.bind(this, 'salary') } onKeyPress={ this.handleKeyPress.bind(this) }/></td>
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