import axios from '../../api/config';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTHENTICATE = 'AUTHENTICATE'; //login attemp
export const AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED';
export const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR';

export function clearAuthError(){
    return {
        type: CLEAR_AUTH_ERROR,
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

export function authenticateUser(userDetails){
    return {
        type: AUTHENTICATE,
        userDetails
    };
}

export function markLoginAsFailed(error){
    return {
        type: AUTHENTICATION_FAILED,
        error
    };
}


export function attemptAuthentication(userDetails){
    return (dispatch, getState) => {
        dispatch(authenticateUser(userDetails));
        
        const params = new URLSearchParams();
        params.append('username', userDetails.username);
        params.append('password', userDetails.password);
    
        axios.post("/authenticate", params, {
            header: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(response => {
              if(response.status === 200){
                  return dispatch(logIntoApp(response.data));
              }else{
                   return dispatch(markLoginAsFailed());
              }
        })
        .catch(function (response) {
            return dispatch(markLoginAsFailed("Login attempt failed"));
        });
    }
}
export default { logIntoApp, logOutOfApp, authenticateUser, attemptAuthentication };