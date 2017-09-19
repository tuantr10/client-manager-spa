import React, { Component } from 'react';
import { connect } from 'react-redux';

import Search from './search';
import SortSelector from './sortSelector';

import { fetchEmployees } from '../actions/employeeActions';

class Navbar extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			keywords: '',
			sort: ''
		};
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
	handleKeywords(event) {
		this.setState({
			keywords: event.target.value
		})
	}
	handleKeyPress(event) {
		if (event.key === 'Enter') {
			this.fetchEmployees();
		}
	}
	render() {
		const { CreateNewEmployeeButton } = this.props;
		return(
			<div className="form-group row">
				<div className="col-md-2">
					{ CreateNewEmployeeButton }
				</div>
				<div className="col-md-8">
					<Search
						fetchEmployees={ this.fetchEmployees.bind(this) }
						handleKeywords={ this.handleKeywords.bind(this) }	
						handleKeyPress={ this.handleKeyPress.bind(this) }
					/>
				</div>
				<div className="col-md-2">
					<SortSelector sortEmployees={ this.sortEmployees.bind(this) }/>
				</div>	
			</div>
		);
	}
}

export default connect((store) => {
	return {}
})(Navbar);