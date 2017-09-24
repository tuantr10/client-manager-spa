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
		const { saveEmployee, cancelEmployee, editingError } = this.props;
		const { employee } = this.state;
		const formKeys = ['name', 'email', 'address', 'phone', 'salary'];

		let formClass = {};
		let errorText = {};
		formKeys.forEach((key) => {
			formClass[key] = 'form-group';
			errorText[key] = '';
		});
		for(let key in editingError) {
			let error = editingError[key];
			formClass[key] = 'form-group has-error';
			errorText[key] = <label className="control-label"> { error.msg } </label>;
		}
		return (
			<tr>
				<td>{ employee.id }</td>
				<td className={ formClass.name }>
					<input className="form-control" type="text" name="name" placeholder="Name" defaultValue={ employee.name } onChange={ this.handleChange.bind(this, 'name') } onKeyPress={ this.handleKeyPress.bind(this) } />
					{ errorText.name }
				</td>
				 <td className={ formClass.email }>
					<input className="form-control" type="email" name="email" placeholder="Email" defaultValue={ employee.email } onChange={ this.handleChange.bind(this, 'email') } onKeyPress={ this.handleKeyPress.bind(this) }/>
					{ errorText.email }
				</td>
				 <td className={ formClass.address }>
					<input className="form-control" type="text" name="address" placeholder="Address" defaultValue={ employee.address } onChange={ this.handleChange.bind(this, 'address') } onKeyPress={ this.handleKeyPress.bind(this) }/>
					{ errorText.address }
				</td>
				 <td className={ formClass.phone }>
					<input className="form-control" type="number" name="phone" placeholder="Phone" defaultValue={ employee.phone } onChange={ this.handleChange.bind(this, 'phone') } onKeyPress={ this.handleKeyPress.bind(this) }/>
					{ errorText.phone }
				</td>
				 <td className={ formClass.salary }>
					<input className="form-control" type="number" name="salary" placeholder="Salary" defaultValue={ employee.salary } onChange={ this.handleChange.bind(this, 'salary') } onKeyPress={ this.handleKeyPress.bind(this) }/>
					{ errorText.salary }
				</td>
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