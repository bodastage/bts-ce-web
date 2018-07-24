import axios from 'axios';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTHENTICATE = 'AUTHENTICATE'; //login attemp
export const AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED';

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
        
        let postSerialData  = "username=" + userDetails.username + "&password=" + 
            userDetails.password;
    
        axios.post("http://192.168.99.100:8181/authenticate/", postSerialData)
        .then(response => {
              console.log(response);
              console.log(response.data);
              if(response.status === 200){
                  return dispatch(logIntoApp(response.data));
              }else{
                   return dispatch(markLoginAsFailed());
              }
        })
        .catch(function (response) {
            console.log(response)
            return dispatch(markLoginAsFailed("Login attempt failed"));
        });
    }
}
export default { logIntoApp, logOutOfApp, authenticateUser, attemptAuthentication };