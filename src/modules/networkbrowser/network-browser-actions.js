import axios, { ERROR_CODES } from '../../api/config';

export const REQUEST_NODES = 'REQUEST_NODES';

export const REQUEST_NODES_FIELDS = 'REQUEST_NODES_FIELDS';

export const RECEIVE_NODES = 'RECEIVE_NODES';

export const RECEIVE_NODES_FIELDS = 'RECEIVE_NODES_FIELDS';

export const NOTIFY_NODE_REQUEST_FAILURE = 'NOTIFY_NODE_REQUEST_FAILURE';

export const DISMISS_NODES_REQUEST_ERROR = 'DISMISS_NODES_REQUEST_ERROR';

export const ADD_TO_EXPANDED_LIVE_NODES = 'ADD_TO_EXPANDED_LIVE_NODES';

export const REMOVE_FROM_EXPANDED_LIVE_NODES = 'REMOVE_FROM_EXPANDED_LIVE_NODES';

export const ADD_TO_EXPANDED_PLAN_NODES = 'ADD_TO_EXPANDED_PLAN_NODES';

export const REMOVE_FROM_EXPANDED_PLAN_NODES = 'REMOVE_FROM_EXPANDED_PLAN_NODES';

export const REQUEST_LIVE_NETWORK_TREE_DATA = 'REQUEST_LIVE_NETWORK_TREE_DATA';

export const STOP_REQUESTING_LIVE_NETWORK_TREE_DATA = 'STOP_REQUESTING_LIVE_NETWORK_TREE_DATA';

export const NOTIFY_LIVE_NET_TREE_DATA_REQ_FAILURE = 'NOTIFY_LIVE_NET_TREE_DATA_REQ_FAILURE';

export const RECEIVE_LIVE_NETWORK_TREE_DATA = 'RECEIVE_LIVE_NETWORK_TREE_DATA';

export const FILTER_NETWORK_TREE = 'FILTER_NETWORK_TREE';

export const REQUEST_CELL_PARAMETERS = 'REQUEST_CELL_PARAMETERS';

export const RECEIVE_CELL_PARAMETERS = 'RECEIVE_CELL_PARAMETERS';

export const NOTIFY_CELL_PARAMETERS_REQUEST_FAILURE = 'NOTIFY_CELL_PARAMETERS_REQUEST_FAILURE';

export const REQUEST_CELL_RELATIONS = 'REQUEST_CELL_RELATIONS';

export const RECEIVE_CELL_RELATIONS = 'RECEIVE_CELL_RELATIONS';

export const NOTIFY_CELL_RELATIONS_REQUEST_FAILURE = 'NOTIFY_CELL_RELATIONS_REQUEST_FAILURE';

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

export function addToExpandedLiveNodes(nodeId){
    return {
        type: ADD_TO_EXPANDED_LIVE_NODES,
        nodeId: nodeId
    }
}

export function removeFromExpandedLiveNodes(nodeId){
    return {
        type: REMOVE_FROM_EXPANDED_LIVE_NODES,
        nodeId: nodeId
    }
}

export function addToExpandedPlanNodes(nodeId){
    return {
        type: ADD_TO_EXPANDED_PLAN_NODES,
        nodeId: nodeId
    }
}

export function removeFromExpandedPlanNodes(nodeId){
    return {
        type: REMOVE_FROM_EXPANDED_PLAN_NODES,
        nodeId: nodeId
    }
}

export function requestLiveNetworkTreeData(){
    return {
        type: REQUEST_LIVE_NETWORK_TREE_DATA
    }
}

export function stopRequestingLiveNetworkTreeData(){
    return {
        type: STOP_REQUESTING_LIVE_NETWORK_TREE_DATA
    }
}

export function notifyTreeDataRequestFailure(error){
    return {
        type: NOTIFY_LIVE_NET_TREE_DATA_REQ_FAILURE,
        error: error
    }
}

export function receiveLiveNetworkTreeData(data, type){
    return {
        type: RECEIVE_LIVE_NETWORK_TREE_DATA,
        data: data,
        entityType: type
    }
}

export function filterNetworkTree(searchText){
    return {
        type: FILTER_NETWORK_TREE,
        searchText: searchText
    }
}

export function requestCellParameters(cellId){
    return {
        type: REQUEST_CELL_PARAMETERS,
        cellId: cellId
    }    
}

export function receiveCellParameters(cellId, data){
    return {
        type: RECEIVE_CELL_PARAMETERS,
        cellId: cellId,
        data: data
    }    
}

export function requestCellRelations(cellId){
    return {
        type: REQUEST_CELL_RELATIONS,
        cellId: cellId
    }    
}

export function receiveCellRelations(cellId, data){
    return {
        type: RECEIVE_CELL_RELATIONS,
        cellId: cellId,
        data: data
    }    
}

export function notifyCellParametersRequestFailure(cellId, error){
    return {
        type: NOTIFY_CELL_PARAMETERS_REQUEST_FAILURE,
        error: error,
        cellId: cellId
    }
}

export function notifyCellRelationsRequestFailure(cellId, error){
    return {
        type: NOTIFY_CELL_RELATIONS_REQUEST_FAILURE,
        error: error,
        cellId: cellId
    }
}

export function getCellParameters(cellId){
    return (dispatch, getState) => {
        dispatch(requestCellParameters(cellId));
        const authToken = getState().session.userDetails.token;
        let apiEndPoint = "/api/network/live/cell/" + cellId;
        
        return axios.get(apiEndPoint,{
            headers: { "Authorization": authToken }
        })
        .then(response => {
            dispatch(receiveCellParameters(cellId, response.data));
        })
        .catch(function(error){
            dispatch(notifyCellParametersRequestFailure(cellId, "Failed to fetch data"));
        });
    }
}

export function getCellRelations(cellId){
    return (dispatch, getState) => {
        dispatch(requestCellRelations(cellId));
        const authToken = getState().session.userDetails.token;
        let apiEndPoint = "/api/network/live/cellrelations/" + cellId;
        
        return axios.get(apiEndPoint,{
            headers: { "Authorization": authToken }
        })
        .then(response => {
            dispatch(receiveCellRelations(cellId, response.data));
        })
        .catch(function(error){
            dispatch(notifyCellRelationsRequestFailure(cellId, "Failed to fetch data"));
        });
        
    }
}

export function populateNetworkTree(requestState){
    return (dispatch, getState) => {
        dispatch(requestLiveNetworkTreeData());
        
        const authToken = getState().session.userDetails.token;
        let apiEndPoint = "/api/network/live/nodes";
        
        if(requestState.type === 'nodes'){
            apiEndPoint = "/api/network/live/nodes?start=" + requestState.start;
            apiEndPoint += '&length=' + requestState.length;
        }
        
        if(requestState.type === 'sites'){
            apiEndPoint = "/api/network/live/sites?start=" + requestState.start;
            apiEndPoint += '&length=' + requestState.length;
        }
        
        if(requestState.type === 'cells'){
            apiEndPoint = "/api/network/live/cells/umts?start=" + requestState.start;
            apiEndPoint += '&length=' + requestState.length;
        }
        
        return axios.get(apiEndPoint,{
            headers: { "Authorization": authToken }
        })
        .then(response => {
            dispatch(receiveLiveNetworkTreeData(response.data, requestState.type));
        })
        .catch(function(error){
            dispatch(notifyTreeDataRequestFailure("Failed to fetch data"));
        });
    }
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
        
        let nextPage = page || 0;
        let pageLength = length || 1;
        
        const authToken = getState().session.userDetails.token;
        
        let apiEndPoint = "/api/network/live/nodes";
        if ( entity === 'node') apiEndPoint = "/api/network/live/nodes?start=" + nextPage + "&length=" + pageLength;
        if ( entity === 'site') apiEndPoint = "/api/network/live/sites?start=" + nextPage + "&length=" + pageLength;
        if ( entity === 'relation') apiEndPoint = "/api/network/live/relations?start=" + nextPage + "&length=" + pageLength;
        if ( entity === 'gsm_cell_params') apiEndPoint = "/api/network/live/cells/gsm?start=" + nextPage + "&length=" + pageLength;
        if ( entity === 'umts_cell_params') apiEndPoint = "/api/network/live/cells/umts?start=" + nextPage + "&length=" + pageLength;
        if ( entity === 'lte_cell_params') apiEndPoint = "/api/network/live/cells/lte?start=" + nextPage + "&length=" + pageLength ;
        if ( entity === 'gsm_externals') apiEndPoint = "/api/network/live/externals/gsm?start=" + nextPage + "&length=" + pageLength;
        if ( entity === 'umts_externals') apiEndPoint = "/api/network/live/externals/umts?start=" + nextPage + "&length=" + pageLength;
        if ( entity === 'lte_externals') apiEndPoint = "/api/network/live/externals/lte?start=" + nextPage + "&length=" + pageLength;
        
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