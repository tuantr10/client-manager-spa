import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8081';
import Notifications, {success, error } from 'react-notification-system-redux';

export function fetchEmployees(params={keywords: '', sort: ''}) {
	let request = '/api/employees/';
	if (params.keywords) request += '?q=' + params.keywords;
	if (params.sort) {
		if (params.keywords) {
			request += '&'
		} else {
			request += '?'
		}
		request += 'sort=' + params.sort;
	}
	return function(dispatch) {
		axios.get(request)
			.then((res) => {
				dispatch({type: 'FETCH_EMPLOYEES_FULFILLED', payload: res.data})
			})
			.catch((err) => {
				dispatch({type: 'FETCH_EMPLOYEES_REJECTED', payload: err})
				dispatch(error({
					title: 'Failure',
					message: err.message,
					position: 'br',
					autoDismiss: 2
				}));
			});
	}
};

export function deleteEmployee(employeeId) {
	return function(dispatch) {
		axios.delete('/api/employees/' + employeeId)
		.then((res) => {
			dispatch({type: 'DELETE_EMPLOYEE_FULFILLED', payload: res.data})
			dispatch(success({
				title: 'Success',
				message: 'Delete User Successfully',
				position: 'br',
				autoDismiss: 2
			}));	
		})
		.catch((err) => {
			dispatch({type: 'DELETE_EMPLOYEE_REJECTED', payload: err})
			dispatch(error({
				title: 'Failure',
				message: err.message,
				position: 'br',
				autoDismiss: 2
			}));
		});

	}
};

export function toggleEditEmployee(id) {
	return function(dispatch) {
		dispatch({type: 'TOGGLE_EDIT_EMPLOYEE', payload: id});
	}
}

export function toggleCreateEmployee(isCreatingEmployee) {
	return function(dispatch) {
		dispatch({type: 'TOGGLE_CREATE_EMPLOYEE', payload: isCreatingEmployee});
	}
}
export function updateEmployee(employee) {
	return function(dispatch) {
		axios.put('/api/employees/' + employee.id, employee)
		.then((res) => {
			dispatch({type: 'UPDATE_EMPLOYEE_FULFILLED', payload: res.data});
			dispatch(success({
				title: 'Success',
				message: 'Updated User Successfully',
				position: 'br',
				autoDismiss: 2
			}));	
		})
		.catch((err) => {
			dispatch({type: 'UPDATE_EMPLOYEE_REJECTED', payload: err})
			let errors = err.response.data.errors;
			for (let key in errors) {
				dispatch(error({
					title: 'Failure',
					message: errors[key].msg,
					position: 'br',
					autoDismiss: 2
				}));
			}
		})
	}
};

export function createEmployee(employee) {
	return function(dispatch) {
		axios.post('/api/employees/', employee)
		.then((res) => {
			dispatch({type: 'CREATE_EMPLOYEE_FULFILLED', payload: res.data})
			dispatch(success({
				title: 'Success',
				message: 'Created Successfully',
				position: 'br',
				autoDismiss: 2
			}));	
		})
		.catch((err) => {
			dispatch({type: 'CREATE_EMPLOYEE_REJECTED', payload: err})
			let errors = err.response.data.errors;
			for (let key in errors) {
				dispatch(error({
					title: 'Failure',
					message: errors[key].msg,
					position: 'br',
					autoDismiss: 2
				}));
			}
		});
	}
};