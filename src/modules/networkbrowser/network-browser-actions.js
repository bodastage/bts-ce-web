import axios, { ERROR_CODES } from '../../api/config';

//Make GET request for vendors
export const REQUEST_NODES = 'REQUEST_NODES';

//Receive requested vendors
export const RECEIVE_NODES = 'RECEIVE_NODES';

//Notify UI that request has failed
export const NOTIFY_NODE_REQUEST_FAILURE = 'NOTIFY_NODE_REQUEST_FAILURE';

//Dismiss the error message
export const DISMISS_NODES_REQUEST_ERROR = 'DISMISS_NODES_REQUEST_ERROR';

export function requestNodes(entity){
    return {
        type: REQUEST_NODES,
        entity: entity
    };
}

export function dismissRequestError(entity){
    return {
        type: DISMISS_NODES_REQUEST_ERROR,
        entity: entity
    };
}

export function receiveNodes(entity, data){
    return {
        type: RECEIVE_NODES,
        entity: entity,
        data
    };
}

export function notifyNodesRequestFailure(entity, errorMessage){
    return {
        type: NOTIFY_NODE_REQUEST_FAILURE,
        entity: entity,
        error: errorMessage
    };
}

export function getEntities(entity){
    return (dispatch, getState) => {
        dispatch(requestNodes(entity));
        
        const authToken = getState().session.userDetails.token;
        
        let apiEndPoint = "/api/network/nodes";
        if ( entity === 'node') apiEndPoint = "/api/network/nodes";
        if ( entity === 'site') apiEndPoint = "/api/network/sites";
        if ( entity === 'relation') apiEndPoint = "/api/network/relations";
        
        axios.get(apiEndPoint,{
            headers: { "Authorization": authToken }
        })
        .then(response => {
            
            return dispatch(receiveNodes(entity, response.data));
        })
        .catch(function(error){
            return dispatch(notifyNodesRequestFailure(entity, "Failed to fetch data"));
        });
    }
}