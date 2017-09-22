import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';
import employees from './employeeReducer';

export default combineReducers({
	employees, notifications
})