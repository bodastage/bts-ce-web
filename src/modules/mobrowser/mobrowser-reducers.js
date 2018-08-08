import { SET_MO_FILTER_TEXT, SET_MO_FILTER_VENDOR, SET_MO_FILTER_TECH, SET_MO_FILTER,
    FETCH_MOS, NOTIFY_MOS_FETCH_FAILURE, RECEIVE_MOS, DISMISS_MOS_FETCH_ERROR} 
    from './mobrowser-actions';

let initialState  = {
    technologies: ['GSM','UMTS','LTE'],
    vendors: ['Ericsson','Huawei'],
    fetchError: null,
    filter: {
        text: '',
        vendor: 'Ericsson',
        technology: 'GSM'
    },
    fetchingMOs: false,
    mos: {
        'Ericsson-GSM': [],
        'Ericsson-UMTS': [],
        'Ericsson-LTE': [],
        'Huawei-GSM': [],
        'Huawei-UMTS': [],
        'Huawei-LTE': [],
    }
};

export default function mobrowser(state = initialState, action) {
        switch (action.type) {
            case SET_MO_FILTER:
                return Object.assign({}, state, { filter: action.filter });
            case FETCH_MOS:
                return Object.assign({}, state, { fetchingMOs: true });
            case NOTIFY_MOS_FETCH_FAILURE:
                return Object.assign({}, state, { fetchError: action.error });
            case DISMISS_MOS_FETCH_ERROR:
                return Object.assign({}, state, { fetchError: null });
            case RECEIVE_MOS:
                let vendorTech = action.vendor + '-' + action.technology;
                return Object.assign({}, state, { 
                    fetchingMOs: false,
                    fetchError: null,
                    mos: Object.assign({},state.mos, {
                        [vendorTech]: action.mos
                    })
                });
            default:
                return state;
        }
}