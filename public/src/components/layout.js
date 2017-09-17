import React, { Component } from 'react';
import { connect } from 'react-redux';
import Employees from './employees';
import { fetchEmployees } from '../actions/employeeActions';

class App extends Component {
	componentWillMount() {
		this.props.dispatch(fetchEmployees());
	}
	render() {
		const { employeesHash } = this.props;
		return (
			<div> 
				<Employees employeesHash={ employeesHash } />
			</div>
		);
	}
}

export default connect((store) => {
	return {
		employeesHash: store.employeesHash,
		err: store.err
	}
})(App);