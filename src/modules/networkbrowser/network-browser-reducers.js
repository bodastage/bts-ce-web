import { REQUEST_NODES, RECEIVE_NODES, NOTIFY_NODE_REQUEST_FAILURE, 
         DISMISS_NODES_REQUEST_ERROR, RECEIVE_NODES_FIELDS } from './network-browser-actions';

let initialState = {
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
            return Object.assign({}, state, { 
                [entity]: {
                    requesting: false,
                    requestError: null,
                    data: action.data,
                    fields: state[entity].fields
                }
            });
        case RECEIVE_NODES_FIELDS:
            return Object.assign({}, state, { 
                [entity]: {
                    requesting: false,
                    requestError: null,
                    data: action.data,
                    fields: action.fields
                }
            });
        case NOTIFY_NODE_REQUEST_FAILURE:
            return Object.assign({}, state, { 
                [entity]: {
                    requesting: false,
                    requestError: action.error,
                    data: state[entity].data,
                    fields: state[entity].fields
                }
            });
        case DISMISS_NODES_REQUEST_ERROR:
            return Object.assign({}, state, { 
                [entity]: {
                    requesting: false,
                    requestError: null,
                    data: state[entity].data,
                    fields: state[entity].fields
                }
            });
        default:
            return state;
    }
}