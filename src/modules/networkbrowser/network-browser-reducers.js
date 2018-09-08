import { REQUEST_NODES, RECEIVE_NODES, NOTIFY_NODE_REQUEST_FAILURE, 
        DISMISS_NODES_REQUEST_ERROR, RECEIVE_NODES_FIELDS, 
        ADD_TO_EXPANDED_LIVE_NODES, REMOVE_FROM_EXPANDED_LIVE_NODES,
        REQUEST_LIVE_NETWORK_TREE_DATA, RECEIVE_LIVE_NETWORK_TREE_DATA,
        FILTER_NETWORK_TREE, REQUEST_CELL_PARAMETERS, RECEIVE_CELL_PARAMETERS } 
     from './network-browser-actions';

let initialState = {
    live_tree: {
        "mscs": {name: "MSCs", id: "mscs", children: {}},
        "bscs": {name: "BSCs", id: "bscs", children: {}},
        "rncs":{name: "RNCs", id: "rncs", children: {}},
        "enodebs":{name: "eNodeBs", id: "enodebs", children: []}
    },
    plan_tree: [],
    live_expanded_nodes: [],
    requesting_tree_data: true,
    live_tree_request_state: {type: "nodes",start:0,length:1000, total:null},
    tree_filter: {text: ""},
    cells: {}
};


export default function networkbrowser(state = initialState, action) {
    
    switch (action.type) {
        case REQUEST_NODES:
            if(typeof action.entity === 'undefined'){
                return state;
            }
            let entity=action.entity;
            if( typeof state[entity]=== 'undefined' ){
                return Object.assign({}, state, { 
                    [entity]: {
                        requesting: true,
                        requestError: null,
                        data: [],
                        fields: []
                    }
                });
            }
            
            return Object.assign({}, state, { 
                [entity]: {
                    requesting: true,
                    requestError: null,
                    data: state[entity].data,
                    fields: state[entity].fields
                }
            });

        case RECEIVE_NODES:
            if(typeof action.entity === 'undefined'){
                return state;
            }
            entity=action.entity;
            return Object.assign({}, state, { 
                [entity]: {
                    requesting: false,
                    requestError: null,
                    data: action.data,
                    fields: state[entity].fields
                }
            });
        case RECEIVE_NODES_FIELDS:
            if(typeof action.entity === 'undefined'){
                return state;
            }
            entity=action.entity;
            return Object.assign({}, state, { 
                [entity]: {
                    requesting: false,
                    requestError: null,
                    data: action.data,
                    fields: action.fields
                }
            });
        case NOTIFY_NODE_REQUEST_FAILURE:
            if(typeof action.entity === 'undefined'){
                return state;
            }
            entity=action.entity;
            return Object.assign({}, state, { 
                [entity]: {
                    requesting: false,
                    requestError: action.error,
                    data: state[entity].data,
                    fields: state[entity].fields
                }
            });
        case DISMISS_NODES_REQUEST_ERROR:
            if(typeof action.entity === 'undefined'){
                return state;
            }
            entity=action.entity;
            return Object.assign({}, state, { 
                [entity]: {
                    requesting: false,
                    requestError: null,
                    data: state[entity].data,
                    fields: state[entity].fields
                }
            });
        case ADD_TO_EXPANDED_LIVE_NODES:
            return Object.assign({}, state, {
                live_expanded_nodes: [...state.live_expanded_nodes, action.nodeId]
            });
        case REMOVE_FROM_EXPANDED_LIVE_NODES:
            return Object.assign({}, state, {
                live_expanded_nodes: state.live_expanded_nodes.filter( (v,k) => v != action.nodeId )
            });
        case REQUEST_LIVE_NETWORK_TREE_DATA:
            return {
                ...state,
                requesting_tree_data: true
            }
        case FILTER_NETWORK_TREE:
            return {
                ...state,
                tree_filter: {text: action.searchText }
            }
        case RECEIVE_LIVE_NETWORK_TREE_DATA:
            let nodes = state.live_tree
            const type    = action.entityType
            
            for(let i in action.data.data){
                let n = action.data.data[i]
                if(type === 'nodes' && n.type === 'RNC'){
                    let id   = "rnc-" + n.nodename;
                    nodes['rncs'].children[id] = {"id": id, entityId: id, "name": n.nodename,  type: "rnc", children:{}, count: 0 }
                    nodes['rncs'].count = action.data.recordsTotal
                }
                if(type === 'nodes' && n.type === 'BSC'){
                    let id   = "bsc-" + n.nodename;
                    nodes['bscs'].children[id] = {"id": id, "entityId": n.id, "name": n.nodename, type: "bsc", children:{}}
                    nodes['bscs'].count = action.data.recordsTotal
                }
                if(type === 'nodes' && n.type === 'mscs'){
                    let id   = "msc-" + n.nodename;
                    nodes['mscs'].children[id] = {"id": id, "entityId": n.id, "name": n.nodename, type: "msc"}
                    nodes['mscs'].count = action.data.recordsTotal
                }
                
                if(type === 'sites' ){
                    let id   = "site-" + n.name;
                    let parentId = ''
                    
                    if (n.technology === 'UMTS'){
                        parentId = "rnc-" + n.node ;
                        nodes['rncs'].children[parentId].children[id] = {"id": id, "entityId": n.id, "name": n.name, "type": "site", children:{}}
                        nodes['rncs'].children[parentId].count = typeof nodes['rncs'].children[parentId].count === 'undefined' ? 0 : nodes['rncs'].children[parentId].count + 1
                    }
                    
                    if (n.technology === 'GSM'){
                        parentId = "bsc-" + n.node;
                        nodes['bscs'].children[parentId].children[id] = {"id": id, "entityId": n.id, "name": n.nodename}
                        nodes['bscs'].children[parentId].count = typeof nodes['bscs'][parentId].count === 'undefined' ? 0 : nodes['bscs'][parentId].count + 1
                    }
                }
                
                
                if(type === 'cells' ){
                    let id   = "cell-" + n.cellname;
                    let nodeId = ''
                    let siteId = ''

                    nodeId = "rnc-" + n.node ;
                    siteId = "site-" + n.site
                    nodes['rncs'].children[nodeId].children[siteId].children[id] = {"id": id, "entityId": n.ci, "name": n.cellname, "type": "cell"}
                    //nodes['rncs'].children[nodeId].children[siteId].count = typeof nodes['rncs'].children[nodeId].children[siteId].count === 'undefined' ? 0 : nodes['rncs'].children[nodeId].children[siteId].count + 1
                    
                }
            }
            
            let live_tree_request_state = state.live_tree_request_state;
            let requesting_tree_data = state.requesting_tree_data;
            const start = live_tree_request_state.start;
            const nextLength = live_tree_request_state.length;
            const recordsTotal = action.data.recordsTotal;
                
            const total = (start + 1) * nextLength;
            if(type === 'nodes' && total <  recordsTotal ){
                live_tree_request_state = {type: "nodes",
                    start: start + 1, length: nextLength, total: recordsTotal}
            }else if( type === 'nodes'){
                live_tree_request_state = {type: "sites", start: 0,  length: nextLength, total:recordsTotal}
            }
            
            if( type === 'sites' && total <  recordsTotal ){
                live_tree_request_state = {type: "sites", start: start + 1, length: nextLength, total: recordsTotal}
            }else if( type === 'sites'){
                live_tree_request_state = {type: "cells", start: 0,  length: nextLength, total:0}
            }
            
            if( type === 'cells' && total <  recordsTotal ){
                live_tree_request_state = {type: "cells", start: start + 1, length: nextLength, total: recordsTotal}
            }else if( type === 'cells'){
                requesting_tree_data = false;
            }
            
            return {
                ...state,
                live_tree: nodes,
                live_tree_request_state: live_tree_request_state,
                requesting_tree_data: requesting_tree_data
            }
        case REQUEST_CELL_PARAMETERS:
            return state;
        case RECEIVE_CELL_PARAMETERS:
            return {
                ...state,
                cells: {
                    ...state.cells, 
                    [action.cellId]: { parameters: action.data }
                }
           }
        default:
            return state;
    }
}