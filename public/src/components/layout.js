import React, { Component } from 'react';
import { connect } from 'react-redux';
import Employees from './employees';
import { fetchEmployees } from '../actions/employeeActions';

class App extends Component {
	componentWillMount() {
		this.props.dispatch(fetchEmployees());
	}
	render() {
		const { employees } = this.props;
		return (
			<div> 
				<Employees employees={ employees }/>
			</div>
		);
	}
}

export default connect((store) => {
	return {
		employees: store.employees,
		err: store.err
	}
})(App);