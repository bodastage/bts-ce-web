import { ADD_TAB, CLOSE_TAB, SET_ACTIVE_TAB } from './uilayout-actions';

let initialState = {
    tabs: {'dashboard': { component: 'Dashboard', options:{title: "Dashboard"}}},
    activeTab: 'dashboard'
};

export default function uiLayout(state = initialState, action) {

    switch (action.type) {
        case ADD_TAB:
            if ( typeof action.id === 'undefined' || action.id === null ) return state;
            
            if (typeof state.tabs[action.id] != 'undefined' ) { 
                return Object.assign({}, state, {
                    activeTab: action.id
                });
            }
            
            return Object.assign({}, state, {
                tabs: Object.assign({},state.tabs, {[action.id]:{component: action.component, options: action.options}}),
                activeTab: action.id
            });
        case CLOSE_TAB:
             if ( typeof action.id === 'undefined' || action.id === null ) return state;
             if ( typeof state.tabs[action.id] === 'undefined' ) { return state; }
            
            //@TODO: State should not be modifed. Or can this be done here?!
            delete state.tabs[action.id];
            
            return Object.assign({}, state, {
                tabs: state.tabs,
                activeTab: 'dashboard'
            });
        case SET_ACTIVE_TAB:
             if ( typeof action.id === 'undefined' || action.id === null ) return state;
            
            return Object.assign({}, state, {
                activeTab: action.id
            });
    }
        
    return state;

}