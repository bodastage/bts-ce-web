import axios, { ERROR_CODES } from '../../api/config';

export const SEND_PROFILE_UPDATE_REQUEST = 'SEND_PROFILE_UPDATE_REQUEST';

export const NOTIFY_PROFILE_UPDATE_FAILURE = 'NOTIFY_PROFILE_UPDATE_FAILURE';

export const NOTIFY_PROFILE_UPDATE_SUCCESS = 'NOTIFY_PROFILE_UPDATE_SUCCESS';

//Dismiss the error message
export const CLEAR_PROFILE_UPDATE_ERROR = 'CLEAR_PROFILE_UPDATE_ERROR';


export function sendProfileUpdateRequest(profileData){
    return {
        type: SEND_PROFILE_UPDATE_REQUEST,
        data: profileData
    }
}

export function notifyProfileUpdateFailure(error){
    return {
        type: NOTIFY_PROFILE_UPDATE_FAILURE,
        error: error
    }
}

export function notifyProfileUpdateSuccess(){
    return {
        type: NOTIFY_PROFILE_UPDATE_SUCCESS,
    }
}

export function clearProfileUpdateError(){
    return {
        type: CLEAR_PROFILE_UPDATE_ERROR
    }
}


export function updateUserProfile(profileData){
    return (dispatch, getState) => {
        dispatch(sendProfileUpdateRequest);
        
        let apiToken = getState().session.userDetails.token;
        
        axios.post('/api/users',profileData,{
            headers: { 'Authorization': apiToken }
        })
        .then( response => {
            if(response.status === 200){
                return dispatch(notifyProfileUpdateSuccess());
            }else{
                return dispatch(notifyProfileUpdateFailure("Update failed"));
            }
        })
        .catch(function(error){
            return dispatch(notifyProfileUpdateFailure("Update failed"));
        });
    }
}