import React, { Component } from 'react';
import Employee from './employee';
import EmployeeStore from '../store';
import EmployeeAction from '../actions/employeeActions';

export default class Employees extends Component {
	render() {
		const { employees } = this.props;
		return (
			<div className='employee-list'>
				<ul className='employee'>
					{employees.map(employee => (
						<li key={ employee.id } className='todo__item'>
							<Employee employee={ employee } />
						</li>
					))}
				</ul>
			</div>
		);
	}
}