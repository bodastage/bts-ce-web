import * as actions from '../../src/modules/session/session-actions'

describe('session.actions', () => {
  it('should create an action to clear the auth error', () => {
    const text = 'Finish docs'
    const expectedAction = {
      type: actions.CLEAR_AUTH_ERROR,
    }
    expect(actions.clearAuthError()).toEqual(expectedAction)
  })
})