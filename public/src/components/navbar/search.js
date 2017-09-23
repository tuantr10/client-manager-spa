import React, { Component } from 'react';

class Search extends Component {
	render() {
		const { fetchEmployees, handleKeyPress, handleKeywords } = this.props;
		return (
			<div className="input-group">
				<input type="text" className="form-control input-sm" placeholder="Search by name, email, address..." onChange={ handleKeywords } onKeyPress={ handleKeyPress }/>
				<span className="input-group-btn">
					<button className="btn btn-sm btn-primary" type="button" onClick={ fetchEmployees }>
						<i className="glyphicon glyphicon-search"></i>
					</button>
				</span>
			</div>
		);
	}
}

export default Search;