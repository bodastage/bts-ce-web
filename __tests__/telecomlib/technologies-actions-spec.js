import * as actions from '../../src/modules/telecomlib/technologies-actions'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import expect from 'expect'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('technologies.actions', () => {
    it('should create an action to request technologies', () => {
        const expectedAction = {
          type: actions.REQUEST_TECHNOLOGIES,
        }
        expect(actions.requestTechnologies()).toEqual(expectedAction)
    })
    
    it('should create an action to dismiss the request error', () => {
        const expectedAction = {
          type: actions.DISMISS_TECH_REQUEST_ERROR,
        }
        expect(actions.dismissRequestError()).toEqual(expectedAction)
    })
    
    it('should create an action to dismiss the request error', () => {
        const data = {};
        const expectedAction = {
          type: actions.RECEIVE_TECHNOLOGIES,
          data
        }
        expect(actions.receiveTechnologies(data)).toEqual(expectedAction)
    })
    
    it('should create an action to dismiss the request error', () => {
        const errorMessage = "Error occured";
        const expectedAction = {
          type: actions.NOTIFY_TECH_REQUEST_FAILURE,
          error: errorMessage
        }
        expect(actions.notifyTechnologiesRequestFailure(errorMessage)).toEqual(expectedAction)
    })
    
});


describe('technologies.actions.async', () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    });
  
    it('should attempt authentication when done', () => {
        
        const loginDetails = {
            "username": "btsuser@bodastage.org",
            "password": "password",
        };
        
        const userDetails = {
            first_name:"Emmanuel",
            id:1,
            job_title:"Engineer",
            last_name:"Ssebaggala",
            other_names:"Robert",
            password:"password",
            phone_number:"+256772121988",
            photo:"btsuser@bodastage.org",
            token:"MTIzNDU2Nzg5MTIzNDU2Nzg5",
            username:"btsuser@bodastage.org"
        };
        
        const authToken = userDetails.token;
        
        const data  = [];
        
        fetchMock
        .getOnce('/api/technologies', { body:data, headers: { "Authorization": authToken } })

        const store = mockStore({session: {userDetails: userDetails}})
        
        const expectedActions = [
            {
                type: actions.REQUEST_TECHNOLOGIES
            },{
                type: actions.RECEIVE_TECHNOLOGIES,
                data
          }
        ];
        
        return store.dispatch(actions.getTechnologies()).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual(expectedActions[0]) 
            expect(actions[1].type).toEqual(expectedActions[1].type) 
        });
    });
    
});