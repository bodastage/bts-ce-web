import { REQUEST_AUDIT_RULES, RECEIVE_AUDIT_RULES, NOTIFY_AUDIT_REQUEST_ERROR,
         DISMISS_AUDIT_REQUEST_ERROR, REQUEST_AUDIT_RULE_FIELD, RECEIVE_AUDIT_RULE_FIELD, 
         NOTIFY_AUDIT_RULE_FIELD_REQUEST_ERROR,
         SET_AUDIT_RULES_FILTER} from './netaudit-actions';


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