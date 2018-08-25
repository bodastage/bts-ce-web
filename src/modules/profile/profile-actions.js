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
        dispatch(sendProfileUpdateRequest(profileData));
        
        const apiToken = getState().session.userDetails.token;
        const userId = getState().session.userDetails.id;
        const endPoint = '/api/users/' + userId;
        
        return axios.post(endPoint,profileData,{
            headers: { 'Authorization': apiToken }
        })
        .then( response => {
            if(response.status === 200){
                dispatch(notifyProfileUpdateSuccess());
            }else{
                dispatch(notifyProfileUpdateFailure("Update failed"));
            }
        })
        .catch(function(error){
            dispatch(notifyProfileUpdateFailure("Update failed"));
        });
    }
}