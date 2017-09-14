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