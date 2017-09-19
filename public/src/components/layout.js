import React, { Component } from 'react';
import { connect } from 'react-redux';
import Employees from './employees';
import { fetchEmployees } from '../actions/employeeActions';

class App extends Component {
	componentWillMount() {
		this.props.dispatch(fetchEmployees());
	}
	render() {
		const { employeesHash, employeesId } = this.props;
		return (
			<div> 
				<Employees employeesHash={ employeesHash } employeesId={ employeesId }/>
			</div>
		);
	}
}

export default connect((store) => {
	return {
		employeesHash: store.employeesHash,
		employeesId: store.employeesId,
		err: store.err
	}
})(App);