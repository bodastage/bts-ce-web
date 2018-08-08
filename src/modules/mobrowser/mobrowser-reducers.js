import { SET_MO_FILTER_TEXT, SET_MO_FILTER_VENDOR, SET_MO_FILTER_TECH, SET_MO_FILTER,
    FETCH_MOS} 
    from './mobrowser-actions';

let initialState  = {
    technologies: ['GSM','UMTS','LTE'],
    vendors: ['Ericsson','Huawei'],
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
            default:
                return state;
        }
}