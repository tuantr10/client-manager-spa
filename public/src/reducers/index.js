export default function reducer(state={employees: [], err: null}, action) {
	switch (action.type) {
		case 'FETCH_EMPLOYEES_FULFILLED':
			return state = { ...state, employees: action.payload };
			break;
		case 'FETCH_EMPLOYEES_REJECTED':
			return state = { ...state, err: action.payload };
			break;
		default:
			return state;
			break;
	}
}