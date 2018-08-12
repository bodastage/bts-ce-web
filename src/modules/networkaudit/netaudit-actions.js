import axios, { ERROR_CODES } from '../../api/config';

export const REQUEST_AUDIT_RULES = 'REQUEST_AUDIT_RULES';
export const RECEIVE_AUDIT_RULES = 'RECEIVE_AUDIT_RULES';
export const NOTIFY_AUDIT_REQUEST_ERROR = 'NOTIFY_AUDIT_REQUEST_ERROR';
export const DISMISS_AUDIT_REQUEST_ERROR = 'DISMISS_AUDIT_REQUEST_ERROR';

export const REQUEST_AUDIT_RULE_FIELD = 'REQUEST_AUDIT_RULE_FIELD';
export const RECEIVE_AUDIT_RULE_FIELD = 'RECEIVE_AUDIT_RULE_FIELD';
export const NOTIFY_AUDIT_RULE_FIELD_REQUEST_ERROR = 'NOTIFY_AUDIT_RULE_FIELD_REQUEST_ERROR';
export const DISMISS_AUDIT_RULE_FIELD_REQUEST_ERROR = 'DISMISS_AUDIT_RULE_FIELD_REQUEST_ERROR';

export const SET_AUDIT_RULES_FILTER = 'SET_AUDIT_RULES_FILTER';

export function requestAuditRules(){
    return {
        type: REQUEST_AUDIT_RULES
    };
}

export function receiveAuditRules(rules){
    return {
        type: RECEIVE_AUDIT_RULES,
        rules: rules
    };
}

export function notifyAuditRuleRequestError(error){
    return {
        type: NOTIFY_AUDIT_REQUEST_ERROR,
        error: error
    };
}

export function dismissAuditRuleRequestError(){
    return {
        type: DISMISS_AUDIT_REQUEST_ERROR
    };
}

export function setAuditRuleFilter(filterText, filterCategories, filterRules){
    console.log("filterRules:", filterRules);
    return {
        type: SET_AUDIT_RULES_FILTER,
        filter: {
            text: filterText,
            categories: filterCategories, 
            rules: filterRules 
        }
    };
}



export function getAuditRules(){
    return (dispatch, getState) => {
        dispatch(requestAuditRules());
        
        const authToken = getState().session.userDetails.token;
        let apiEndPoint = "/api/networkaudit/rules/";
        
        axios.get(apiEndPoint,{
            headers: { "Authorization": authToken }
        })
        .then(response => {
            return dispatch(receiveAuditRules(response.data));
        })
        .catch(function(error){
            return dispatch(notifyAuditRuleRequestError("Failed to fetch audit rules"));
        });
        
    }
}