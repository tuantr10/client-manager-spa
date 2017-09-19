import React, { Component } from 'react';
import { connect } from 'react-redux';
import Employee from './employee';
import EmployeeForm from './employeeForm';
import EmployeeStore from '../store';
import { createEmployee, fetchEmployees } from '../actions/employeeActions';
import _ from 'underscore';

class Employees extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isCreatingNewEmployee: false,
			newEmployee: {},
			keywords: '',
			sort: ''
		};
	}
	createNewEmployee() {
		this.setState({
			isCreatingNewEmployee: true
		});
	}
	saveNewEmployee(newEmployee) {
		this.setState({
			isCreatingNewEmployee: false,
			newEmployee: {}
		}, () => {
			this.props.dispatch(createEmployee(newEmployee));
		});
	}
	cancelNewEmployee() {
		this.setState({
			isCreatingNewEmployee: false
		});
	}
	handleKeywords(event) {
		this.setState({
			keywords: event.target.value
		});
	}
	fetchEmployees() {
		this.props.dispatch(fetchEmployees({
			keywords: this.state.keywords,
			sort: this.state.sort
		}));
	}
	sortEmployees(event) {
		this.setState({sort: event.target.value}, () => {
			this.fetchEmployees();
		});
	}
	handleKeyPress(event) {
		if (event.key === 'Enter') {
			this.fetchEmployees();
		}
	}
	render() {
		const { employeesHash, employeesId } = this.props;
		const { isCreatingNewEmployee } = this.state;
		let CreateNewEmployeeRow, CreateNewEmployeeButton;
		let { newEmployee } = this.state;

		if (isCreatingNewEmployee) {
			CreateNewEmployeeRow = 
				<tbody>
					<EmployeeForm
						employee = { newEmployee }
						saveEmployee = { this.saveNewEmployee.bind(this) }
						deleteEmployee = { this.cancelNewEmployee.bind(this) }
					/>
				</tbody>
		} else {
			CreateNewEmployeeButton = <button className="btn btn-sm btn-primary" onClick={() => this.createNewEmployee()}>Add New Employee</button>
		}
		return (
			<div>
				<h2 className="text-center">Mothership | Employee Manager</h2>
				<div className="form-group row">
					<div className="col-md-2">
						{ CreateNewEmployeeButton }
					</div>
					<div className="col-md-8">
						<div className="input-group">
							<input type="text" className="form-control input-sm" placeholder="Search by name, email, address..." onChange={ this.handleKeywords.bind(this) } onKeyPress={ this.handleKeyPress.bind(this) }/>
							<span className="input-group-btn">
								<button className="btn btn-sm btn-primary" type="button" onClick={ this.fetchEmployees.bind(this) }>
									<i className="glyphicon glyphicon-search"></i>
								</button>
							</span>
						</div>
					</div>
					<div className="col-md-2">
						<select className="form-control" onChange={ this.sortEmployees.bind(this) }>
							<option>Sort By</option>
							<option value="name">Name (A→Z)</option>
							<option value="-name">Name (Z→A)</option>
							<option value="email">Email (A→Z)</option>
							<option value="-email">Email (Z→A)</option>
							<option value="-salary">Salary (High→Low)</option>
							<option value="salary">Salary (Low→High)</option>
						</select>
					</div>	
				</div>
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
				</div>
			</div>
		);
	}
}

export default connect((store) => {
	return {}
})(Employees);