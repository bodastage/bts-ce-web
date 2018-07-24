import { combineReducers } from 'redux';
import { LOGIN, LOGOUT, AUTHENTICATE, AUTHENTICATION_FAILED, CLEAR_AUTH_ERROR } 
    from './session-actions';

let initialState = {
    authenticated: false,
    authenticating: false,
    loginError: null
};
function session(state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATE:
            return Object.assign({}, state, {
                authenticated: false,
                authenticating: true,
                loginError: null
            });
        case LOGIN:
            return Object.assign({}, state, {
                authenticated: true,
                authenticating: false,
                userDetails: action.userDetails,
                loginError: null
            });
        case LOGOUT:
            return Object.assign({}, state, {
                authenticated: false,
                authenticating: false,
                loginError: null,
                userDetails: null});
        case AUTHENTICATION_FAILED:
            return Object.assign({}, state, {
                authenticated: false,
                authenticating: false,
                userDetails: null,
                loginError: action.error});
        case CLEAR_AUTH_ERROR:
            return Object.assign({}, state, {loginError: null});
        default:
            return state;
    }
}


export default session;
