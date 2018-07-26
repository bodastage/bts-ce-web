import { combineReducers } from 'redux';
import session from './modules/session/session-reducers';
import help from './modules/help/help-reducers';
import uiLayout from './modules/layout/uilayout-reducers';
import vendors from './modules/telecomlib/vendors-reducers';
import technologies from './modules/telecomlib/technologies-reducers';
import profile from './modules/profile/profile-reducers';
import networkbrowser from './modules/networkbrowser/network-browser-reducers';


const appReducer = combineReducers({
  session,
  help,
  uiLayout,
  vendors,
  technologies,
  profile,
  networkbrowser
});

export default appReducer;