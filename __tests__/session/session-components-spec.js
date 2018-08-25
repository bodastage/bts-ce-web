import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import LoginForm from '../../src/modules/session/LoginForm'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux';
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

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

const store = mockStore({session: {userDetails: userDetails}})


Enzyme.configure({ adapter: new Adapter() })

function setup() {
    const props = {}
  
    const enzymeWrapper = mount(
            <Provider store={store}>
                <LoginForm {...props} />
            </Provider>            
            )
  
    return {
        props,
        enzymeWrapper
    }
  
}


describe('session components', () => {
    
    describe('<LoginForm/>', () => {
        it('should render login form', () => {
            const { enzymeWrapper } = setup()
            
            expect(enzymeWrapper.find('form.form-signin')).toHaveLength(1)
            
        })
    })
    
})