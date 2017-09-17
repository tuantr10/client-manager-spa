import axios from 'axios';

export function fetchEmployees() {
	return function(dispatch) {
		axios.get('http://localhost:3000/api/employees/')
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
		axios.delete('http://localhost:3000/api/employees/' + employeeId)
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
		axios.put('http://localhost:3000/api/employees/' + employee.id, employee)
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
		axios.post('http://localhost:3000/api/employees/', employee)
		.then((res) => {
			dispatch({type: 'CREATE_EMPLOYEE_FULFILLED', payload: res.data})
		})
		.catch((err) => {
			dispatch({type: 'CREATE_EMPLOYEE_REJECTED', payload: err})
		});
	}
};