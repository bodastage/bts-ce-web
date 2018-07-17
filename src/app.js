import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './configure-store';
import LoginForm from './modules/session/LoginForm';
import UILayout from './modules/layout/UILayout';
import $ from 'jquery';
import { connect } from 'react-redux';

class App extends Component {
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
    authenticated: state.authenticated
  }
}

export default connect(mapStateToProps)(App);