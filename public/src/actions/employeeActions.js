import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

export function fetchEmployees(params={keywords: '', sort: ''}) {
	let request = '/api/employees/';
	request += '?q=' + params.keywords;
	request += '&sort=' + params.sort;
	return function(dispatch) {
		axios.get(request)
			.then((res) => {
				dispatch({type: 'FETCH_EMPLOYEES_FULFILLED', payload: res.data})
			})
			.catch((err) => {
				dispatch({type: 'FETCH_EMPLOYEES_REJECTED', payload: err})
			});
	}
};

export function deleteEmployee(employeeId) {
	return function(dispatch) {
		axios.delete('/api/employees/' + employeeId)
		.then((res) => {
			dispatch({type: 'DELETE_EMPLOYEE_FULFILLED', payload: res.data})
		})
		.catch((err) => {
			dispatch({type: 'DELETE_EMPLOYEE_REJECTED', payload: err})
		});

	}
};

export function editEmployee(employee) {
	return function(dispatch) {
		axios.put('/api/employees/' + employee.id, employee)
		.then((res) => {
			dispatch({type: 'EDIT_EMPLOYEE_FULFILLED', payload: res.data})
		})
		.catch((err) => {
			dispatch({type: 'EDIT_EMPLOYEE_REJECTED', payload: err})
		});
	}
};

export function createEmployee(employee) {
	return function(dispatch) {
		axios.post('/api/employees/', employee)
		.then((res) => {
			dispatch({type: 'CREATE_EMPLOYEE_FULFILLED', payload: res.data})
		})
		.catch((err) => {
			dispatch({type: 'CREATE_EMPLOYEE_REJECTED', payload: err})
		});
	}
};