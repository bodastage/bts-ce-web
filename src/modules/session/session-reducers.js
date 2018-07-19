import { combineReducers } from 'redux';
import { LOGIN, LOGOUT, AUTHENTICATE } from './session-actions';

let initialState = {
    authenticated: false,
    authenticating: false,
    tabs: []
};
function authenticateUser(state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                authenticated: false,
                authenticating: true,
                userDetails: action.userDetails
            };
        break;
        case LOGIN:
            return {
                authenticated: true,
                authenticating: false,
                userDetails: action.userDetails
            };
        break;
        case LOGOUT:
            return Object.assign({}, state, {authenticated: false,
                userDetails: null});
        break;
        default:
            return state;
    }
}

const sessionReducer = authenticateUser;

export default sessionReducer;
