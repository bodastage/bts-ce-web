import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { Provider } from 'react-redux';
import configureStore from './configure-store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import Loading from './modules/session/loading';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Icons
import { library } from '@fortawesome/fontawesome-svg-core'
        import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
        import { faLock, faAt, faSpinner } from '@fortawesome/free-solid-svg-icons'

        library.add(faLock, faAt, faSpinner);

const store = configureStore();

const persistor = persistStore(store);

ReactDOM.render(
        <Provider store={store}>
            <PersistGate loading={<Loading show={true}/>} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>, 
    document.getElementById('root'));
