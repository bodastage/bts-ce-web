import { combineReducers } from 'redux';
import sessionReducer from './modules/session/session-reducers';


//const appReducer = combineReducers({
//  sessionReducer
//});
const appReducer = sessionReducer;

export default appReducer;