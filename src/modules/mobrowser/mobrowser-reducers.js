import { SET_MO_FILTER, FETCH_MOS, NOTIFY_MOS_FETCH_FAILURE, RECEIVE_MOS, 
    DISMISS_MOS_FETCH_ERROR, REQUEST_MO_DATA, REQUEST_MO_FEILDS, RECEIVE_MO_FIELDS} 
    from './mobrowser-actions';

let initialState  = {
    technologies: ['GSM','UMTS','LTE'],
    vendors: ['Ericsson','Huawei','ZTE'],
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
        'ZTE-GSM': [],
        'ZTE-UMTS': [],
        'ZTE-LTE': [],
    },
    modata: {}
};

export default function mobrowser(state = initialState, action) {
        switch (action.type) {
        case REQUEST_MO_FEILDS:
            console.log("action.moId:" + action.moId);
            if( typeof state.modata[action.moId]=== 'undefined' ){
                return Object.assign({}, state, { 
                    modata: Object.assign({},state.modata, {
                        [action.moId]: {
                            requesting: true,
                            requestError:  null,
                            token: null,
                            fields: []
                        }
                    })
                });
            }
            
            return Object.assign({}, state, { 
                    modata: Object.assign({},state.modata, {
                        [action.moId]: {
                            requesting: true,
                            requestError:  null,
                            token: state.modata[action.moId].token,
                            fields: state.modata[action.moId].fields
                        }
                    })
                });
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
            case RECEIVE_MO_FIELDS:
                return Object.assign({}, state, { 
                        modata: Object.assign({},state.modata, {
                            [action.moId]: {
                                requesting: false,
                                requestError:  null,
                                token: state.modata[action.moId].token,
                                fields: action.fields
                            }
                        })
                    });
            default:
                return state;
        }
}