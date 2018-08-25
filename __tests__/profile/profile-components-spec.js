import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import UserProfile from '../../src/modules/profile/user-profile'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux';
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

// Move this to a single file to include in all test files 
import { library } from '@fortawesome/fontawesome-svg-core'
        import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
        import { faLock, faAt, faSpinner, faHome, faPlug, faCog, faDownload,
            faQuestionCircle, faUser, faSitemap, faWrench, faPuzzlePiece,faSync,
            faStopCircle, faUniversity, faCogs, faPowerOff, faArrowRight, faList,
            faChartArea, faBrain, faGem, faUserMd, faGlobeAfrica, faPeopleCarry,
            faFolder, faFile, faStar, faChevronRight, faDotCircle, faFolderOpen
        } from '@fortawesome/free-solid-svg-icons'

        library.add(faLock, faAt, faSpinner, faHome, faPlug, faCog, faDownload,
        faQuestionCircle, faUser, faSitemap, faWrench, faPuzzlePiece,faSync,
        faStopCircle, faUniversity, faCogs, faPowerOff, faArrowRight, faList,
        faChartArea, faBrain, faGem, faUserMd, faGlobeAfrica, faPeopleCarry,
        faFolder, faFile, faStar, faChevronRight, faDotCircle, faFolderOpen);
        
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

const store = mockStore({
    session: {userDetails: userDetails},
    profile: {}
})

Enzyme.configure({ adapter: new Adapter() })

describe('<UserProfile/>', () => {
    it('should render user profile form', () => {
        const enzymeWrapper = mount(
            <Provider store={store}>
                <UserProfile/>
            </Provider>            
        )

        expect(enzymeWrapper.find('.user-profile-form')).toHaveLength(1)
    })
})