import _ from 'underscore';

export default function reducer(
	state={	employeesHash: {}, err: null}, action) {
	switch (action.type) {
		case 'FETCH_EMPLOYEES_FULFILLED':
			let employeesHash = {};
			_.each(action.payload, (employee) => {
				employeesHash[employee.id] = employee;
			});
			return state = { ...state, employeesHash: employeesHash };
			break;
		case 'FETCH_EMPLOYEES_REJECTED':
			return state = { ...state, err: action.payload };
			break;
		case 'DELETE_EMPLOYEES_FULFILLED':
			return state = { ...state,
								employeesHash: _.omit(state.employeesHash, parseInt(action.payload))
							};
			break;
		case 'DELETE_EMPLOYEES_REJECTED':
			return state = { ...state, err: action.payload };
			break;
		default:
			return state;
			break;
	}
}