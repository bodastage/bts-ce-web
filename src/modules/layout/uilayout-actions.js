export const ADD_TAB = 'ADD_TAB';
export const CLOSE_TAB = 'CLOSE_TAB';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';

export default function addTab(tabName){
    return {
        type: ADD_TAB,
        tab: tabName
    };
}


export  function closeTab(tabName){
    return {
        type: ADD_TAB,
        tab: tabName
    };
}