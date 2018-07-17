export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTHENTICATE = 'AUTHENTICATE';

export function logIntoApp(userDetails){
    return {
        type: LOGIN,
        userDetails
    };
}

export function logOutOfApp(){
    return {
        type: LOGIN
    };
}

export function authenticateUser(userDetails){
    return {
        type: AUTHENTICATE,
        userDetails
    };
}


export default { logIntoApp, logOutOfApp, authenticateUser };