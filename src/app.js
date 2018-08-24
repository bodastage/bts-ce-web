import React from 'react';
import configureStore from './configure-store';
import LoginForm from './modules/session/LoginForm';
import UILayout from './modules/layout/UILayout';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props){
      super(props)
  }
  
  render() {
      
        if (this.props.authenticated === false) {
            return (<div>
                <LoginForm/>
            </div>);
        }
        
        return (<div>
            <UILayout/>
        </div>);
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.session.authenticated
  }
}

export default connect(mapStateToProps)(App);