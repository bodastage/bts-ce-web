import * as actions from '../../src/modules/session/session-actions'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import moxios from 'moxios'
import sinon from 'sinon'
import expect from 'expect'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('session.actions', () => {
    it('should create an action to clear the auth error', () => {
        const expectedAction = {
          type: actions.CLEAR_AUTH_ERROR,
        }
        expect(actions.clearAuthError()).toEqual(expectedAction)
    })

    it('should create an action to clear the old session', () => {
        const expectedAction = {
          type: actions.CLEAR_OLD_SESSION,
        }
        expect(actions.clearOldSession()).toEqual(expectedAction)
    })

    it('should create an action to log into the app', () => {
        const userDetails = {
            username: "btsuser@bodastage.org"
        };
        
        const expectedAction = {
          type: actions.LOGIN,
          userDetails
        };
        expect(actions.logIntoApp(userDetails)).toEqual(expectedAction);
    });

    it('should create an action to log out of the app', () => {
        const expectedAction = {
          type: actions.LOGOUT
        };
        expect(actions.logOutOfApp()).toEqual(expectedAction);
    });

    it('should create an action to attemp to authenticate the user', () => {
        const loginDetails = {
            username: "btsuser@bodastage.org", 
            password: "password"
        };
        
        const expectedAction = {
          type: actions.AUTHENTICATE,
          loginDetails
        };
        expect(actions.authenticateUser(loginDetails)).toEqual(expectedAction);
    });

    it('should create an action to mark the login/authentication attempt as failed', () => {
        
        const expectedAction = {
          type: actions.AUTHENTICATION_FAILED
        };
        expect(actions.markLoginAsFailed()).toEqual(expectedAction);
    });
  
});


describe('session.actions.async', () => {
    beforeEach(() => {
      moxios.install()
    })
    
    afterEach(() => {
      moxios.uninstall()
    })
  
    it('should attempt authentication when done', (done) => {
        
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
        
        const store = mockStore({})
        
        const expectedActions = [{
              type: actions.AUTHENTICATE,
              loginDetails
            },{
                type: actions.LOGIN,
                userDetails
            }
        ];
        
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            
            request.respondWith({
                status: 200,
                response: userDetails
            }) 
        })
        
        return store.dispatch(actions.attemptAuthentication(loginDetails))
            .then(() => {
                const actions = store.getActions();
                expect(actions).toEqual(expectedActions) 
                
                done()
        });
    });
});