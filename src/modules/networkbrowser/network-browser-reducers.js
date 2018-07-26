import { REQUEST_NODES, RECEIVE_NODES, NOTIFY_NODE_REQUEST_FAILURE, 
         DISMISS_NODES_REQUEST_ERROR } from './network-browser-actions';

let initialState = {
//      entities : {}
//    requestingNodes: false,
//    requestError: null,
//    data: []
};


export default function networkbrowser(state = initialState, action) {

    if(typeof action.entity === 'undefined'){
        return state;
    }
    
    let entity=action.entity;
    
    switch (action.type) {
        case REQUEST_NODES:
            if( typeof state[entity]=== 'undefined' ){
                return Object.assign({}, state, { 
                    [entity]: {
                        requesting: true,
                        requestError: null,
                        data: []
                    }
                });
            }
            
            return Object.assign({}, state, { 
                [entity]: {
                    requesting: true,
                    requestError: null,
                    data: state[entity].data
                }
            });

        case RECEIVE_NODES:
            return Object.assign({}, state, { 
                [entity]: {
                    requesting: false,
                    requestError: null,
                    data: action.data
                }
            });
        case NOTIFY_NODE_REQUEST_FAILURE:
            return Object.assign({}, state, { 
                [entity]: {
                    requesting: false,
                    requestError: action.error,
                    data: state[entity].data
                }
            });
        case DISMISS_NODES_REQUEST_ERROR:
            return Object.assign({}, state, { 
                [entity]: {
                    requesting: false,
                    requestError: null,
                    data: state[entity].data
                }
            });
        default:
            return state;
    }
}