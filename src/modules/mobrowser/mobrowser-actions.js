import axios, { ERROR_CODES } from '../../api/config';

export const FETCH_MOS = 'FETCH_MOS';
export const NOTIFY_MOS_FETCH_FAILURE = 'NOTIFY_MOS_FETCH_FAILURE';
export const NOTIFY_MO_RECEIVE_FIELDS_FAILURE = 'NOTIFY_MO_RECEIVE_FIELDS_FAILURE';
export const DISMISS_MOS_FETCH_ERROR = 'DISMISS_MOS_FETCH_ERROR';
export const RECEIVE_MOS = 'RECEIVE_MOS';
export const FILTER_MOS = 'FILTER_MOS';
export const REQUEST_MO_DATA = 'REQUEST_MO_DATA';
export const REQUEST_MO_FEILDS = 'REQUEST_MO_FEILDS';
export const RECEIVE_MO_FIELDS = 'RECEIVE_MO_FIELDS';
export const FETCH_MOS_VENDORS = 'FETCH_MOS_VENDORS';
export const RECEIVE_MOS_VENDORS = 'RECEIVE_MOS_VENDORS';
export const SET_MO_FILTER = 'SET_MO_FILTER';

export function requestMOFields(moId){
    return {
        type: REQUEST_MO_FEILDS,
        moId: moId
    };
}
    
export function fetchMOs(){
    return {
        type: FETCH_MOS
    };
}

export function receiveMOs(vendor, mos){
    return {
        type: RECEIVE_MOS,
        vendor: vendor,
        mos: mos
    };
}

export function receiveMOFields(moAndVendor, fields){
    return {
        type: RECEIVE_MO_FIELDS,
        fields: fields,
        moAndVendor: moAndVendor
    };
}

export function fetchMOsVendors(){
    return {
        type: FETCH_MOS_VENDORS
    };
}

export function notifyFetchMOsFailure(error){
    return {
        type: NOTIFY_MOS_FETCH_FAILURE,
        error: error
    };
}

export function dismissMOsFetchError(){
    return {
        type: DISMISS_MOS_FETCH_ERROR
    };
}

export function receiveMOsVendors(){
    return {
        type: RECEIVE_MOS_VENDORS
    };
}

export function setFilter(text, vendor, technology){
    return {
        type: SET_MO_FILTER,
        filter: {
            text: text,
            vendor: vendor,
            technology: technology
        }
    };
}

export function notifyFetchMOFieldFailure(modId, error){
    return {
        type: NOTIFY_MO_RECEIVE_FIELDS_FAILURE,
        error: error
    }
}

/**
 * 
 * @param {type} moAndVendor MO - Vendor
 * @returns {Function}
 */
export function getMOFields(moAndVendor){
    return (dispatch, getState) => {
        dispatch(requestMOFields(moAndVendor));
        
        const authToken = getState().session.userDetails.token;
        let apiEndPoint = "/api/managedobjects/fields/" + moAndVendor;
        
        axios.get(apiEndPoint,{
            headers: { "Authorization": authToken }
        })
        .then(response => {
            return dispatch(receiveMOFields(moAndVendor, response.data));
        })
        .catch(function(error){
            return dispatch(notifyFetchMOFieldFailure( moAndVendor, "Failed to get MO fields"));
        });
    }
}

export function initializeMOBrowser(){
    return (dispatch, getState) => {
        dispatch(fetchMOs());
        
        const authToken = getState().session.userDetails.token;
        let apiEndPoint = "/api/managedobjects/ericsson";
        
        const apiEndPoints = {
            'Ericsson': '/api/managedobjects/ericsson',
            'Huawei': '/api/managedobjects/huawei',
            'ZTE': '/api/managedobjects/zte',
            'NOKIA': '/api/managedobjects/nokia',
        };
        
        for(let vendorKey in apiEndPoints){
            let apiEndPoint = apiEndPoints[vendorKey];
            let vendor = vendorKey;
            
            //Get ericsson GSM
            axios.get(apiEndPoint,{
                headers: { "Authorization": authToken }
            })
            .then(response => {
                return dispatch(receiveMOs(vendor, response.data));
            })
            .catch(function(error){
                return dispatch(notifyFetchMOsFailure( "Failed to fetch Ericsson GSM data MOs"));
            });
        }

    }
}