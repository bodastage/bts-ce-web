import { REQUEST_AUDIT_RULES, RECEIVE_AUDIT_RULES, NOTIFY_AUDIT_REQUEST_ERROR,
         DISMISS_AUDIT_REQUEST_ERROR, REQUEST_AUDIT_RULE_FIELDS, 
         RECEIVE_AUDIT_RULE_FIELDS, SET_AUDIT_RULES_FILTER} 
     from './netaudit-actions';


let initialState = {
    requestingRules: false,
    requestError: null,
    rules: [],
    filter:{
        text: '',
        rules: true,
        categories: false
    },
    rulesdata:{}
};

export default function netaudit(state = initialState, action){
        switch (action.type) {
            case REQUEST_AUDIT_RULES:
                return Object.assign({}, state, { requestingRules: true });
            case REQUEST_AUDIT_RULE_FIELDS:
                if( typeof state.rulesdata[action.ruleId]=== 'undefined' ){
                    return Object.assign({}, state, { 
                        rulesdata: Object.assign({},state.rulesdata, {
                            [action.ruleId]: {
                                requesting: true,
                                requestError:  null,
                                fields: []
                            }
                        })
                    });
                }
            
                return Object.assign({}, state, { 
                    modata: Object.assign({},state.rulesdata, {
                        [action.ruleId]: {
                            requesting: true,
                            requestError:  null,
                            fields: state.rulesdata[action.ruleId].fields
                        }
                    })
                });
            case RECEIVE_AUDIT_RULE_FIELDS:
                return Object.assign({}, state, { 
                        rulesdata: Object.assign({},state.rulesdata, {
                            [action.ruleId]: {
                                requesting: false,
                                requestError:  null,
                                fields: action.fields
                            }
                        })
                    });
            case RECEIVE_AUDIT_RULES:
                return Object.assign({}, state, { 
                    requestingRules: false,
                    requestError: null,
                    rules: action.rules
                });
            case NOTIFY_AUDIT_REQUEST_ERROR:
                return Object.assign({}, state, { 
                    requestingRules: false,
                    requestError: action.error
                });
            case DISMISS_AUDIT_REQUEST_ERROR:
                return Object.assign({}, state, { requestError: null });
            case SET_AUDIT_RULES_FILTER:
                return Object.assign({}, state, { filter: action.filter });
            default:
                return state;
        }
}