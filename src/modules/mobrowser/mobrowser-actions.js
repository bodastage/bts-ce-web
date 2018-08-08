import axios, { ERROR_CODES } from '../../api/config';

export const FETCH_MOS = 'FETCH_MOS';
export const NOTIFY_MOS_FETCH_FAILURE = 'NOTIFY_MOS_FETCH_FAILURE';
export const DISMISS_MOS_FETCH_ERROR = 'DISMISS_MOS_FETCH_ERROR';
export const RECEIVE_MOS = 'RECEIVE_MOS';
export const FILTER_MOS = 'FILTER_MOS';
export const FETCH_MO_DATA = 'FETCH_MO_DATA';
export const FETCH_MO_FEILDS = 'FETCH_MO_FEILDS';
export const RECEIVE_MO_FEILDS = 'RECEIVE_MO_FEILDS';
export const FETCH_MOS_VENDORS = 'FETCH_MOS_VENDORS';
export const RECEIVE_MOS_VENDORS = 'RECEIVE_MOS_VENDORS';
export const SET_MO_FILTER_TEXT = 'SET_MO_FILTER_TEXT';
export const SET_MO_FILTER_VENDOR = 'SET_MO_FILTER_VENDOR';
export const SET_MO_FILTER_TECH = 'SET_MO_FILTER_TECH';
export const SET_MO_FILTER = 'SET_MO_FILTER';

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

export function initializeMOBrowser(){
    return (dispatch, getState) => {
        dispatch(fetchMOs());
        
        const authToken = getState().session.userDetails.token;
        let apiEndPoint = "/api/managedobjects/ericsson/gsm";
        
        //Get ericsson GSM
        axios.get(apiEndPoint,{
            headers: { "Authorization": authToken }
        })
        .then(response => {
            return dispatch(receiveMOs('Ericsson', 'GSM', response.data));
        })
        .catch(function(error){
            return dispatch(notifyFetchMOsFailure( "Failed to fetch data Ericsson GSM MOs"));
        });
    }
}