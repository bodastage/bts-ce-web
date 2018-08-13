import axios, { ERROR_CODES } from '../../api/config';

export const REQUEST_AUDIT_RULES = 'REQUEST_AUDIT_RULES';
export const RECEIVE_AUDIT_RULES = 'RECEIVE_AUDIT_RULES';
export const NOTIFY_AUDIT_REQUEST_ERROR = 'NOTIFY_AUDIT_REQUEST_ERROR';
export const DISMISS_AUDIT_REQUEST_ERROR = 'DISMISS_AUDIT_REQUEST_ERROR';

export const REQUEST_AUDIT_RULE_FIELDS = 'REQUEST_AUDIT_RULE_FIELDS';
export const RECEIVE_AUDIT_RULE_FIELDS = 'RECEIVE_AUDIT_RULE_FIELDS';
export const NOTIFY_AUDIT_RULE_FIELDS_REQUEST_ERROR = 'NOTIFY_AUDIT_RULE_FIELDS_REQUEST_ERROR';
export const DISMISS_AUDIT_RULE_FIELDS_REQUEST_ERROR = 'DISMISS_AUDIT_RULE_FIELDS_REQUEST_ERROR';

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
    return {
        type: SET_AUDIT_RULES_FILTER,
        filter: {
            text: filterText,
            categories: filterCategories, 
            rules: filterRules 
        }
    };
}

export function receiveRuleFields(ruleId, fields){
    return {
        type: RECEIVE_AUDIT_RULE_FIELDS,
        ruleId: ruleId,
        fields: fields
    };
}

export function requestRuleFields(ruleId){
    return {
        type: REQUEST_AUDIT_RULE_FIELDS,
        ruleId: ruleId
    };
}

export function notifyReceiveRuleFieldsFailure(){
    
}

export function getRuleFields(ruleId){
    return (dispatch, getState) => {
        dispatch(requestRuleFields(ruleId));
        
        const authToken = getState().session.userDetails.token;
        let apiEndPoint = "/api/networkaudit/rule/fields/" + ruleId;
        
        axios.get(apiEndPoint,{
            headers: { "Authorization": authToken }
        })
        .then(response => {
            return dispatch(receiveRuleFields(ruleId, response.data));
        })
        .catch(function(error){
            return dispatch(notifyReceiveRuleFieldsFailure(ruleId, "Failed to get rule fields"));
        });
    }
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