import { REQUEST_VENDORS, RECEIVE_VENDORS, NOTIFY_VENDOR_REQUEST_FAILURE, 
         DISMISS_VENDORS_REQUEST_ERROR } from './vendors-actions';

let initialState = {
    requestingVendors: false,
    requestError: null,
    data: [],
    fields: []
};


export default function uiLayout(state = initialState, action) {

    switch (action.type) {
        case REQUEST_VENDORS:
            return Object.assign({}, state, {
                requestingVendors: true,
                requestError: null
            });
        case RECEIVE_VENDORS:
            return Object.assign({}, state, {
                requestingVendors: false,
                requestError: null,
                data: action.data
            });
        case NOTIFY_VENDOR_REQUEST_FAILURE:
            return Object.assign({}, state, {
                requestingVendors: false,
                requestError: action.error
            });
        case DISMISS_VENDORS_REQUEST_ERROR:
            return Object.assign({}, state, {
                requestingVendors: false,
                requestError: null
            });
        default:
            return state;
    }
}