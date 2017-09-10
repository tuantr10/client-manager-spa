import React, { Component } from 'react';
import { render } from 'react-dom';
import Employees from './components/employees';

const dummyEmployees = [
	{ id: 10, name: 'Tran', address: 'Tokyo', phone: '08035770906', email: 'tran@gmail.com', salary: 30000},
	{ id: 11, name: 'Tuan', address: 'Osaka', phone: '08035770906', email: 'tuan@gmail.com', salary: 30000}
];

class App extends Component {
	render() {
		return (
			<div>
				<Employees employees={ dummyEmployees }/>
			</div>
		);
	}
}

render(
	<App />,
	document.getElementById('app')
);