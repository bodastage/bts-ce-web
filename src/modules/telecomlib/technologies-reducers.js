import { REQUEST_TECHNOLOGIES, RECEIVE_TECHNOLOGIES, NOTIFY_TECH_REQUEST_FAILURE, 
         DISMISS_TECH_REQUEST_ERROR } from './technologies-actions';

let initialState = {
    requestingData: false,
    requestError: null,
    data: [],
    fields: []
};


export default function uiLayout(state = initialState, action) {

    switch (action.type) {
        case REQUEST_TECHNOLOGIES:
            return Object.assign({}, state, {
                requestingData: true,
                requestError: null
            });
        case RECEIVE_TECHNOLOGIES:
            return Object.assign({}, state, {
                requestingData: false,
                requestError: null,
                data: action.data
            });
        case NOTIFY_TECH_REQUEST_FAILURE:
            return Object.assign({}, state, {
                requestingData: false,
                requestError: action.error
            });
        case DISMISS_TECH_REQUEST_ERROR:
            return Object.assign({}, state, {
                requestingData: false,
                requestError: null
            });
        default:
            return state;
    }
}