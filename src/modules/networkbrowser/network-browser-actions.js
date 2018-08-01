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

export function getEntities(entity, page, length){
    return (dispatch, getState) => {
        dispatch(requestNodes(entity));
        
        let page = page || 0;
        let length = length || 1;
        
        const authToken = getState().session.userDetails.token;
        
        let apiEndPoint = "/api/network/live/nodes";
        if ( entity === 'node') apiEndPoint = "/api/network/live/nodes?start=" + page + "&length=" + length;
        if ( entity === 'site') apiEndPoint = "/api/network/live/sites?start=" + page + "&length=" + length;
        if ( entity === 'relation') apiEndPoint = "/api/network/live/relations?start=" + page + "&length=" + length;
        if ( entity === 'gsm_cell_params') apiEndPoint = "/api/network/live/cells/gsm?start=" + page + "&length=" + length;
        if ( entity === 'umts_cell_params') apiEndPoint = "/api/network/live/cells/umts?start=" + page + "&length=" + length;
        if ( entity === 'lte_cell_params') apiEndPoint = "/api/network/live/cells/lte?start=" + page + "&length=" + length ;
        if ( entity === 'gsm_externals') apiEndPoint = "/api/network/live/externals/gsm?start=" + page + "&length=" + length;
        if ( entity === 'umts_externals') apiEndPoint = "/api/network/live/externals/umts?start=" + page + "&length=" + length;
        if ( entity === 'lte_externals') apiEndPoint = "/api/network/live/externals/lte?start=" + page + "&length=" + length;
        
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