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

export function receiveMOs(vendor, technology, mos){
    return {
        type: RECEIVE_MOS,
        vendor: vendor,
        technology: technology,
        mos: mos
    };
}

export function receiveMOFields(moId, fields){
    return {
        type: RECEIVE_MO_FIELDS,
        fields: fields,
        moId: moId
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

export function getMOFields(moId){
    return (dispatch, getState) => {
        dispatch(requestMOFields(moId));
        
        const authToken = getState().session.userDetails.token;
        let apiEndPoint = "/api/managedobjects/fields/" + moId;
        
        axios.get(apiEndPoint,{
            headers: { "Authorization": authToken }
        })
        .then(response => {
            return dispatch(receiveMOFields(moId, response.data));
        })
        .catch(function(error){
            return dispatch(notifyFetchMOFieldFailure( moId, "Failed to get MO fields"));
        });
    }
}

export function initializeMOBrowser(){
    return (dispatch, getState) => {
        dispatch(fetchMOs());
        
        const authToken = getState().session.userDetails.token;
        let apiEndPoint = "/api/managedobjects/ericsson/gsm";
        
        const apiEndPoints = {
            'Ericsson-GSM': '/api/managedobjects/ericsson/gsm',
            'Ericsson-UMTS': '/api/managedobjects/ericsson/umts',
            'Ericsson-LTE': '/api/managedobjects/ericsson/lte',
            'Huawei-GSM': '/api/managedobjects/huawei/gsm',
            'Huawei-UMTS': '/api/managedobjects/huawei/umts',
            'Huawei-LTE': '/api/managedobjects/huawei/lte',
            'ZTE-GSM': '/api/managedobjects/zte/gsm',
            'ZTE-UMTS': '/api/managedobjects/zte/umts',
            'ZTE-LTE': '/api/managedobjects/zte/lte',
        };
        
        for(let vendorTechKey in apiEndPoints){
            let apiEndPoint = apiEndPoints[vendorTechKey];
            let vendor = vendorTechKey.split('-')[0];
            let tech = vendorTechKey.split('-')[1];
            
            //Get ericsson GSM
            axios.get(apiEndPoint,{
                headers: { "Authorization": authToken }
            })
            .then(response => {
                return dispatch(receiveMOs(vendor, tech, response.data));
            })
            .catch(function(error){
                return dispatch(notifyFetchMOsFailure( "Failed to fetch Ericsson GSM data MOs"));
            });
        }

    }
}