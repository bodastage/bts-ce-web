import * as actions from '../../src/modules/session/session-actions'
import reducer from '../../src/modules/session/session-reducers'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import expect from 'expect'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('session.reducer', () => {
    
    it('should return the initial state', () => {
        const expectedState = {
                authenticated: false,
                authenticating: false,
                loginError: null,
                waitingForDB: false
            };
        expect(reducer(undefined, {})).toEqual(expectedState);
    })
    
    it('should return authenticating state', () => {
        const loginDetails = {};
        const prevState = {};
        const expectedState = {
                authenticated: false,
                authenticating: true,
                loginError: null,
                waitingForDB: false
            };
        expect(reducer(prevState, actions.authenticateUser(loginDetails))).toEqual(expectedState);
    })
});
