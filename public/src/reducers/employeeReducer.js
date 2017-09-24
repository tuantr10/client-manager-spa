import _ from 'underscore';

export default function reducer(
	state={	employeesHash: {}, employeesId: [], editingId:[], isCreatingEmployee: false, err: null, editingErrors: {}}, action) {
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
						employeesHash: _.omit(state.employeesHash, action.payload),
						employeesId: _.without(state.employeesId, action.payload),
						err: {}
					};
			break;
		case 'UPDATE_EMPLOYEE_FULFILLED':
			return {...state,
						employeesHash: {...state.employeesHash, [action.payload.id]: action.payload},
						editingId: _.without([...state.editingId], action.payload.id),
						editingErrors: _.omit(state.editingErrors, action.payload.id),
						err: {}
					};
			break;
		case 'CREATE_EMPLOYEE_FULFILLED':
			return {...state,
						employeesHash: {...state.employeesHash, [action.payload.id]: action.payload},
						employeesId: [...state.employeesId].concat(action.payload.id),
						editingErrors: _.omit(state.editingErrors, action.payload.id),
						isCreatingEmployee: false,
						err: {}
					};
			break;
		case 'TOGGLE_EDIT_EMPLOYEE':
			if(_.contains(state.editingId, action.payload)) {
				return {...state,
					editingId: _.without([...state.editingId], action.payload)
				};
			} else {
				return {...state,
					editingId: [...state.editingId].concat(action.payload)
				};
			}
			break;
		case 'TOGGLE_CREATE_EMPLOYEE':
			return {...state, isCreatingEmployee: action.payload}
			break;
		case 'FETCH_EMPLOYEES_REJECTED':
		case 'DELETE_EMPLOYEE_REJECTED':
			return state = {...state, err: action.payload };
			break;
		case 'UPDATE_EMPLOYEE_REJECTED':
		case 'CREATE_EMPLOYEE_REJECTED':
			console.log(action.payload);
			return state = {...state,
								err: action.payload,
								editingErrors: {...state.editingErrors, [action.payload.response.data.id]: action.payload.response.data.errors
							}};
			break;
		default:
			return state;
			break;
	}
}