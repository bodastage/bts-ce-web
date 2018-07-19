import { SHOW_HELP } from './help-actions';

let initialState = {
    tabs: []
};

export default function helpReducer(state = initialState, action) {
    if ( state.tabs.includes('help') === true ) return state;
    
    return Object.assign({}, state, {
        tabs: [ ...state.tabs, 'help']
    });
}