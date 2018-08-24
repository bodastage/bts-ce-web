import * as actions from '../../src/modules/telecomlib/technologies-actions'

describe('session.actions', () => {
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