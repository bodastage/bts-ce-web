import { ADD_TAB, CLOSE_TAB, SET_ACTIVE_TAB } from './uilayout-actions';

let initialState = {
    tabs: ['Dashboard'],
    activeTab: 'Dashboard'
};

export default function uiLayoutReducer(state = initialState, action) {

    switch (action.type) {
        case ADD_TAB:
            if ( typeof action.tab === 'undefined' || action.tab === null ) return state;
            
            if (state.tabs.includes(action.tab) === true ) { 
                return Object.assign({}, state, {
                    activeTab: action.tab
                });
            }
            
            return Object.assign({}, state, {
                tabs: [ ...state.tabs, action.tab],
                activeTab: action.tab
            });
        case CLOSE_TAB:
             if ( typeof action.tab === 'undefined' || action.tab === null ) return state;
             if ( state.tabs.includes(action.tab) !== true ) { return state; }
            
            return Object.assign({}, state, {
                tabs: state.tabs.filter(tab => tab != action.tab ),
                activeTab: 'Dashboard'
            });
        case SET_ACTIVE_TAB:
             if ( typeof action.tab === 'undefined' || action.tab === null ) return state;
            
            return Object.assign({}, state, {
                activeTab: action.tab
            });
    }
        
    return state;

}