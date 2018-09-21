import { REQUEST_STATS, RECEIVE_STATS } from './performance-actions';

let initialState = {
    "site_stats": {"data": [], fetching_done: false, request_state: {start:0,length:1000, total:null}}
}

export default function performance(state = initialState, action) {
    
    switch (action.type) {
        case REQUEST_STATS:
            return {
                ...state,
            }
        case RECEIVE_STATS:
            const start = state.site_stats.request_state.start;
            const nextLength = state.site_stats.request_state.length;
            const recordsTotal = action.data.recordsTotal;
            const total = (start + 1) * nextLength;
            
            let fetching_done = false
            let request_state = state.site_stats.request_state
            
            if(total <  recordsTotal){
                request_state.start = start + 1
                request_state.total = recordsTotal
            }else{
                request_state.start = start + 1
                fetching_done = true
            }
            
            return {
                ...state,
                "site_stats": {
                    ...state.site_stats, 
                    request_state: request_state, 
                    fetching_done: fetching_done,
                    data: action.data.data
                }
            }
        default:
            return state;
    }
}