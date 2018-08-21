import * as actions from '../../src/modules/session/session-actions'

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
        const userDetails = {
            username: "btsuser@bodastage.org", 
            password: "password"
        };
        
        const expectedAction = {
          type: actions.AUTHENTICATE,
          userDetails
        };
        expect(actions.authenticateUser(userDetails)).toEqual(expectedAction);
    });

    it('should create an action to mark the login/authentication attempt as failed', () => {
        
        const expectedAction = {
          type: actions.AUTHENTICATION_FAILED
        };
        expect(actions.markLoginAsFailed()).toEqual(expectedAction);
    });
  

    it('should create an action to attemp user authentication', () => {
        const userDetails = {
            username: "btsuser@bodastage.org", 
            password: "password"
        };
        
        const expectedAction = {
          type: actions.LOGIN,
          userDetails
        };
        
        expect(typeof actions.attemptAuthentication(userDetails)).toEqual("function");
    });

})