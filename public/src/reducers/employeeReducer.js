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
			return {...state, employeesHash: employeesHash,
						employeesId: employeesId,
						err: {}
					};
			break;
		case 'DELETE_EMPLOYEE_FULFILLED':
			return {...state, 
						employeesHash: _.omit(state.employeesHash, parseInt(action.payload)),
						employeesId: _.without(state.employeesId, parseInt(action.payload)),
						err: {}
					};
			break;
		case 'EDIT_EMPLOYEE_FULFILLED':
			return {...state,
						employeesHash: {...state.employeesHash, [action.payload.id]: action.payload},
						err: {}
					};
			break;
		case 'CREATE_EMPLOYEE_FULFILLED':
			return {...state,
						employeesHash: {...state.employeesHash, [action.payload.id]: action.payload},
						employeesId: [...state.employeesId].concat(action.payload.id),
						err: {}
					};
			break;
		case 'FETCH_EMPLOYEES_REJECTED':
		case 'EDIT_EMPLOYEE_REJECTED':
		case 'CREATE_EMPLOYEE_REJECTED':
		case 'DELETE_EMPLOYEE_REJECTED':
			return state = {...state, err: action.payload };
			break;
		default:
			return state;
			break;
	}
}