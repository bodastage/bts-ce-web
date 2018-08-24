import axios from '../../api/config';
import 'url-search-params-polyfill';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTHENTICATE = 'AUTHENTICATE'; //login attemp
export const AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED';
export const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR';
export const CLEAR_OLD_SESSION = 'CLEAR_OLD_SESSION';

export function clearAuthError(){
    return {
        type: CLEAR_AUTH_ERROR
    };
}

export function clearOldSession(){
    return {
        type: CLEAR_OLD_SESSION,
    };
}

export function logIntoApp(userDetails){
    return {
        type: LOGIN,
        userDetails
    };
}

export function logOutOfApp(){
    return {
        type: LOGOUT
    };
}

export function authenticateUser(loginDetails){
    return {
        type: AUTHENTICATE,
        loginDetails
    };
}

export function markLoginAsFailed(error){
    return {
        type: AUTHENTICATION_FAILED,
        error
    };
}


export function attemptAuthentication(loginDetails){
    return (dispatch, getState) => {
        dispatch(authenticateUser(loginDetails));
        
        const params = new URLSearchParams();
        params.append('username', loginDetails.username);
        params.append('password', loginDetails.password);
    
        return axios.post("/authenticate", params, {
            header: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(response => {
              if(response.status === 200){
                  dispatch(logIntoApp(response.data));
              }else{
                   dispatch(markLoginAsFailed());
              }
        })
        .catch(function (response) {
            dispatch(markLoginAsFailed("Login attempt failed"));
        });
    }
}
export default { logIntoApp, logOutOfApp, authenticateUser, attemptAuthentication };