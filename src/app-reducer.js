import { combineReducers } from 'redux';
import session from './modules/session/session-reducers';
import help from './modules/help/help-reducers';
import uiLayout from './modules/layout/uilayout-reducers';
import vendors from './modules/telecomlib/vendors-reducers';
import technologies from './modules/telecomlib/technologies-reducers';


const appReducer = combineReducers({
  session,
  help,
  uiLayout,
  vendors,
  technologies
});
//const appReducer = sessionReducer;

export default appReducer;