import React, { Component } from 'react';
import { connect } from 'react-redux';
import Employees from './employees';
import { fetchEmployees } from '../actions/employeeActions';

class App extends Component {
	componentWillMount() {
		this.props.dispatch(fetchEmployees());
	}
	render() {
		return (
			<div> 
				<Employees employees={ this.props.employees }/>
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