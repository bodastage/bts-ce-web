import axios, { ERROR_CODES } from '../../api/config';

export const REQUEST_NODES = 'REQUEST_NODES';

export const REQUEST_NODES_FIELDS = 'REQUEST_NODES_FIELDS';

export const RECEIVE_NODES = 'RECEIVE_NODES';

export const RECEIVE_NODES_FIELDS = 'RECEIVE_NODES_FIELDS';

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

export function receiveNodeFields(entity, fields){
    return {
        type: RECEIVE_NODES_FIELDS,
        entity: entity,
        fields: fields
    };
}

export function notifyNodesRequestFailure(entity, errorMessage){
    return {
        type: NOTIFY_NODE_REQUEST_FAILURE,
        entity: entity,
        error: errorMessage
    };
}

export function getEntityFields(entity){
    return (dispatch, getState) => {
        dispatch(requestNodes(entity));
        
        const authToken = getState().session.userDetails.token;
        
        let apiEndPoint = "/api/network/live/nodes/fields";
        if ( entity === 'node') apiEndPoint = "/api/network/live/nodes/fields";
        if ( entity === 'site') apiEndPoint = "/api/network/live/sites/fields";
        if ( entity === 'relation') apiEndPoint = "/api/network/live/relations/fields";
        if ( entity === 'gsm_cell_params') apiEndPoint = "/api/network/live/cells/gsm/fields" ;
        if ( entity === 'umts_cell_params') apiEndPoint = "/api/network/live/cells/umts/fields" ;
        if ( entity === 'lte_cell_params') apiEndPoint = "/api/network/live/cells/lte/fields"  ;
        if ( entity === 'gsm_externals') apiEndPoint = "/api/network/live/externals/gsm/fields" ;
        if ( entity === 'umts_externals') apiEndPoint = "/api/network/live/externals/umts/fields" ;
        if ( entity === 'lte_externals') apiEndPoint = "/api/network/live/externals/lte/fields";

        return axios.get(apiEndPoint,{
            headers: { "Authorization": authToken }
        })
        .then(response => {
            dispatch(receiveNodeFields(entity, response.data));
        })
        .catch(function(error){
            dispatch(notifyNodesRequestFailure(entity, "Failed to fetch data"));
        });
    }
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
        
        return axios.get(apiEndPoint,{
            headers: { "Authorization": authToken }
        })
        .then(response => {
            dispatch(receiveNodes(entity, response.data));
        })
        .catch(function(error){
            dispatch(notifyNodesRequestFailure(entity, "Failed to fetch data"));
        });
    }
}