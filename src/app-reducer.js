import { combineReducers } from 'redux';
import sessionReducer from './modules/session/session-reducers';
import helpReducer from './modules/help/help-reducers';


const appReducer = combineReducers({
  sessionReducer,
  helpReducer
});
//const appReducer = sessionReducer;

export default appReducer;