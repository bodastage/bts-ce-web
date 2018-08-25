import React from 'react'
import Dashboard from '../../src/modules/dashboard/dashboard'
import DashboardSidePanel from '../../src/modules/dashboard/dashboard-sidepanel'
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

describe('<Dashboard/>', () => {
    it('should render dashboard view', () => {
        const enzymeWrapper = mount(
            <Provider store={store}>
                <Dashboard/>
            </Provider>            
        )

        expect(enzymeWrapper.contains(<legend className="legend">Radio Access Network</legend>)).toBe(true)
        expect(enzymeWrapper.contains(<div className="icon-label">Network Browser</div>)).toBe(true)
        expect(enzymeWrapper.contains(<div className="icon-label">Network Audit</div>)).toBe(true)
        expect(enzymeWrapper.contains(<div className="icon-label">MO Browser</div>)).toBe(true)
        expect(enzymeWrapper.contains(<div className="icon-label">Network Baseline</div>)).toBe(true)
        expect(enzymeWrapper.contains(<div className="icon-label">Telecom Library</div>)).toBe(true)
        expect(enzymeWrapper.contains(<legend className="legend">Service Assurance</legend>)).toBe(true)
        expect(enzymeWrapper.contains(<div className="icon-label">Reports</div>)).toBe(true)
        expect(enzymeWrapper.contains(<div className="icon-label">SON</div>)).toBe(true)
        expect(enzymeWrapper.contains(<div className="icon-label">CEM</div>)).toBe(true)
        expect(enzymeWrapper.contains(<div className="icon-label">Faults</div>)).toBe(true)
        expect(enzymeWrapper.contains(<div className="icon-label">GIS</div>)).toBe(true)
        expect(enzymeWrapper.contains(<div className="icon-label">WorkFlow</div>)).toBe(true)
        expect(enzymeWrapper.contains(<legend className="legend">System</legend>)).toBe(true)
        expect(enzymeWrapper.contains(<div className="icon-label">Processes</div>)).toBe(true)
        expect(enzymeWrapper.contains(<div className="icon-label">Profile</div>)).toBe(true)
        expect(enzymeWrapper.contains(<div className="icon-label">Settings</div>)).toBe(true)
        expect(enzymeWrapper.contains(<div className="icon-label">Help</div>)).toBe(true)
    })
})



describe('<DashboardSidePanel/>', () => {
    it('should render side panel with list of modules', () => {
        const enzymeWrapper = mount(
            <Provider store={store}>
                <DashboardSidePanel/>
            </Provider>            
        )

        expect(enzymeWrapper.contains(<span className="dropdown-item-text legend w-100">Radio Access Network</span>)).toBe(true)
    })
})