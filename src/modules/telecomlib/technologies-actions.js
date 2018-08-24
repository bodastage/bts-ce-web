import axios, { ERROR_CODES } from '../../api/config';

//Make GET request for vendors
export const REQUEST_TECHNOLOGIES = 'REQUEST_TECHNOLOGIES';

//Receive requested vendors
export const RECEIVE_TECHNOLOGIES = 'RECEIVE_TECHNOLOGIES';

//Notify UI that request has failed
export const NOTIFY_TECH_REQUEST_FAILURE = 'NOTIFY_TECHNOLOGIES_REQUEST_FAILURE';

//Dismiss the error message
export const DISMISS_TECH_REQUEST_ERROR = 'DISMISS_TECHNOLOGIES_REQUEST_ERROR';

export function requestTechnologies(){
    return {
        type: REQUEST_TECHNOLOGIES
    };
}

export function dismissRequestError(){
    return {
        type: DISMISS_TECH_REQUEST_ERROR
    };
}

export function receiveTechnologies(data){
    return {
        type: RECEIVE_TECHNOLOGIES,
        data
    };
}

export function notifyTechnologiesRequestFailure(errorMessage){
    return {
        type: NOTIFY_TECH_REQUEST_FAILURE,
        error: errorMessage
    };
}

export function getTechnologies(){
    return (dispatch, getState) => {
        dispatch(requestTechnologies());
        
        const authToken = getState().session.userDetails.token;
        
        return axios.get('/api/technologies',{
            headers: { "Authorization": authToken }
        })
        .then(response => {
            dispatch(receiveTechnologies(response.data));
        })
        .catch(function(error){
            dispatch(notifyTechnologiesRequestFailure("Failed to fetch data"));
        });
    }
}