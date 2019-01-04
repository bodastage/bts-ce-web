
import axios, { ERROR_CODES } from '../../api/config';

//Make GET request for vendors
export const REQUEST_BASELINE = 'REQUEST_BASELINE';

//Receive requested vendors
export const RECEIVE_BASELINE = 'RECEIVE_BASELINE';

//Notify UI that request has failed
export const NOTIFY_BASELINE_REQUEST_FAILURE = 'NOTIFY_BASELINE_REQUEST_FAILURE';

//Dismiss the error message
export const DISMISS_BASELINE_REQUEST_ERROR = 'DISMISS_BASELINE_REQUEST_ERROR';



export function requestBaseline(){
    return {
        type: REQUEST_BASELINE
    };
}

export function dismissRequestError(){
    return {
        type: DISMISS_BASELINE_REQUEST_ERROR
    };
}

export function receiveBaseline(data){
    return {
        type: RECEIVE_BASELINE,
        data
    };
}

export function notifyBaselineRequestFailure(errorMessage){
    return {
        type: NOTIFY_BASELINE_REQUEST_FAILURE,
        error: errorMessage
    };
}

export function getBaseline(){
    return (dispatch, getState) => {
        dispatch(requestBaseline());
        
        const authToken = getState().session.userDetails.token;
        
        return axios.get('/api/networkbaseline',{
            headers: { "Authorization": authToken }
        })
        .then(response => {
            dispatch(receiveBaseline(response.data));
        })
        .catch(function(error){
            dispatch(notifyBaselineRequestFailure("Failed to fetch data"));
        });
    }
}
