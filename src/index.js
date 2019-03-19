import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { Provider } from 'react-redux';
import configureStore from './configure-store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import Loading from './modules/session/Loading';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import icons from 'glyphicons'

//Blueprintjs
import 'normalize.css/normalize.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/core/lib/css/blueprint.css'

// Icons
import { library } from '@fortawesome/fontawesome-svg-core'
        import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
        import { faLock, faAt, faSpinner, faHome, faPlug, faCog, faDownload,
            faQuestionCircle, faUser, faSitemap, faWrench, faPuzzlePiece,faSync,
            faStopCircle, faUniversity, faCogs, faPowerOff, faArrowRight, faList,
            faChartArea, faBrain, faGem, faUserMd, faGlobeAfrica, faPeopleCarry,
            faFolder, faFile, faStar, faChevronRight, faDotCircle, faFolderOpen,
            faLink, faClock, faRss, faChartLine, faSquare, faTable, faInfoCircle
        } from '@fortawesome/free-solid-svg-icons'

        library.add(faLock, faAt, faSpinner, faHome, faPlug, faCog, faDownload,
        faQuestionCircle, faUser, faSitemap, faWrench, faPuzzlePiece,faSync,
        faStopCircle, faUniversity, faCogs, faPowerOff, faArrowRight, faList,
        faChartArea, faBrain, faGem, faUserMd, faGlobeAfrica, faPeopleCarry,
        faFolder, faFile, faStar, faChevronRight, faDotCircle, faFolderOpen, 
        faLink, faClock, faRss, faChartLine, faSquare, faTable, faInfoCircle);

const store = configureStore();

const persistor = persistStore(store);

ReactDOM.render(
        <Provider store={store} key="provider">
            <PersistGate loading={<Loading show={true}/>} persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>,
    document.getElementById('root'));
