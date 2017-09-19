import _ from 'underscore';

export default function reducer(
	state={	employeesHash: {}, employeesId: [], err: null}, action) {
	switch (action.type) {
		case 'FETCH_EMPLOYEES_FULFILLED':
			let employeesHash = {};
			let employeesId = [];
			_.each(action.payload, (employee) => {
				employeesId.push(employee.id);
				employeesHash[employee.id] = employee;
			});
			return state = { ...state, employeesHash: employeesHash, employeesId: employeesId };
			break;
		case 'DELETE_EMPLOYEE_FULFILLED':
			return state = { ...state, employeesHash: _.omit(state.employeesHash, parseInt(action.payload))};
			break;
		case 'EDIT_EMPLOYEE_FULFILLED':
		case 'CREATE_EMPLOYEE_FULFILLED':
			return { ...state, employeesHash: {...state.employeesHash, [action.payload.id]: action.payload}} 
			break;
		case 'FETCH_EMPLOYEES_REJECTED':
		case 'EDIT_EMPLOYEE_REJECTED':
		case 'CREATE_EMPLOYEE_REJECTED':
		case 'DELETE_EMPLOYEE_REJECTED':
			return state = { ...state, err: action.payload };
			break;
		default:
			return state;
			break;
	}
}