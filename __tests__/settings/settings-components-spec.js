import React from 'react'
import Settings from '../../src/modules/settings/Settings'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux';


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

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const store = mockStore({})

Enzyme.configure({ adapter: new Adapter() })


describe('<Settings/>', () => {
    it('should render settings dashboard', () => {
        const enzymeWrapper = mount(
            <Provider store={store}>
                <Settings/>
            </Provider>            
        )

    expect(enzymeWrapper.contains(<h3><FontAwesomeIcon icon="cog"/> Settings</h3>)).toBe(true)
    expect(enzymeWrapper.contains(<span> Configuration management</span>)).toBe(true)
    })
})