import { combineReducers } from 'redux';
import sessionReducer from './modules/session/session-reducers';
import helpReducer from './modules/help/help-reducers';
import uiLayoutReducer from './modules/layout/uilayout-reducers';


const appReducer = combineReducers({
  sessionReducer,
  helpReducer,
  uiLayoutReducer
});
//const appReducer = sessionReducer;

export default appReducer;