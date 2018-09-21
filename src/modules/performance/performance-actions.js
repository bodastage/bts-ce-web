import axios, { ERROR_CODES } from '../../api/config';

export const REQUEST_STATS = 'REQUEST_STATS';

export const RECEIVE_STATS = 'RECEIVE_STATS';

export const NOTIFY_REQUEST_STATS_FAILURE = 'NOTIFY_REQUEST_STATS_FAILURE';

export function requestStats(){
    return {
        type: REQUEST_STATS
    }
}

export function receiveStats(data){
    return {
        type: RECEIVE_STATS,
        data: data
    }
}

export function notifyStatsRequestFailure(error){
    return {
        type: NOTIFY_REQUEST_STATS_FAILURE,
        error: error
    }
}

export function getSiteStats(requestState){
    return (dispatch, getState) => {
        dispatch(requestStats());
        const authToken = getState().session.userDetails.token;
        let apiEndPoint = "/api/pm/site_stats?start=" + requestState.start;
            apiEndPoint += '&length=' + requestState.length;
        
        return axios.get(apiEndPoint,{
            headers: { "Authorization": authToken }
        })
        .then(response => {
            dispatch(receiveStats(response.data));
        })
        .catch(function(error){
            dispatch(notifyStatsRequestFailure( "Failed to fetch data"));
        });
    }
}