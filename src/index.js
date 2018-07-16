import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './modules/session/LoginForm';
import UILayout from './modules/layout/UILayout';
import $ from 'jquery';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Icons
import { library } from '@fortawesome/fontawesome-svg-core'
        import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
        import { faLock, faAt } from '@fortawesome/free-solid-svg-icons'

        library.add(faLock, faAt);


window.jQuery = $;


const App = () => (
            <div>
                <UILayout/>
            </div>
            );

ReactDOM.render(<App />, document.getElementById('root'));
