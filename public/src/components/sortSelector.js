import React, { Component } from 'react';

class SortSelector extends Component {
	render() {
		const { sortEmployees } = this.props;
		return (
			<select className="form-control" onChange={ sortEmployees }>
				<option>Sort By</option>
				<option value="name">Name (A→Z)</option>
				<option value="-name">Name (Z→A)</option>
				<option value="email">Email (A→Z)</option>
				<option value="-email">Email (Z→A)</option>
				<option value="-salary">Salary (High→Low)</option>
				<option value="salary">Salary (Low→High)</option>
			</select>
		);
	}
}

export default SortSelector;