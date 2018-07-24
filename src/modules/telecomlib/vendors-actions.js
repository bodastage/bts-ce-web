import axios, { ERROR_CODES } from '../../api/config';

//Make GET request for vendors
export const REQUEST_VENDORS = 'REQUEST_VENDORS';

//Receive requested vendors
export const RECEIVE_VENDORS = 'RECEIVE_VENDORS';

//Notify UI that request has failed
export const NOTIFY_VENDOR_REQUEST_FAILURE = 'NOTIFY_VENDOR_REQUEST_FAILURE';

//Dismiss the error message
export const DISMISS_VENDORS_REQUEST_ERROR = 'DISMISS_VENDORS_REQUEST_ERROR';

export function requestVendors(){
    return {
        type: REQUEST_VENDORS
    };
}

export function dismissRequestError(){
    return {
        type: DISMISS_VENDORS_REQUEST_ERROR
    };
}

export function receiveVendors(data){
    return {
        type: RECEIVE_VENDORS,
        data
    };
}

export function notifyVendorsRequestFailure(errorMessage){
    return {
        type: NOTIFY_VENDOR_REQUEST_FAILURE,
        error: errorMessage
    };
}

export function getVendors(){
    return (dispatch, getState) => {
        dispatch(requestVendors);
        
        const authToken = getState().session.userDetails.token;
        
        console.log("authToken" + authToken);
        
        axios.get('/api/vendors',{
            headers: { "Authorization": authToken }
        })
        .then(response => {
            return dispatch(receiveVendors(response.data));
        })
        .catch(function(error){
            return dispatch(notifyVendorsRequestFailure("Failed to fetch data"));
        });
    }
}