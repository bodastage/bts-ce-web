import React from 'react'
import Help from '../../src/modules/help/help'
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

describe('<Help/>', () => {
    it('should render help view', () => {
        const enzymeWrapper = mount(
            <Provider store={store}>
                <Help/>
            </Provider>            
        )

        expect(enzymeWrapper.find(<h4 className="card-title">About</h4>)).toHaveLength(0)
    })
})