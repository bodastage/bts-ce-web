import { combineReducers } from 'redux';
import session from './modules/session/session-reducers';
import help from './modules/help/help-reducers';
import uiLayout from './modules/layout/uilayout-reducers';
import vendors from './modules/telecomlib/vendors-reducers';
import technologies from './modules/telecomlib/technologies-reducers';
import profile from './modules/profile/profile-reducers';
import networkbrowser from './modules/networkbrowser/network-browser-reducers';
import mobrowser from './modules/mobrowser/mobrowser-reducers';
import netaudit from './modules/networkaudit/netaudit-reducers';
import baseline from './modules/networkbaseline/networkbaseline-reducers';
import performance from './modules/performance/performance-reducer';


const appReducer = combineReducers({
  session,
  help,
  uiLayout,
  vendors,
  technologies,
  profile,
  networkbrowser,
  mobrowser,
  netaudit,
  baseline,
  performance
});

export default appReducer;