import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../images/logo.svg';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as sessionActions from './session-actions';
import LoginFormCSS from './LoginForm.css';
import Loading from './loading';
import axios from 'axios';
import { attemptAuthentication, clearAuthError, clearOldSession } from '../session/session-actions';
import { Button, Intent, FormGroup, InputGroup  } from "@blueprintjs/core";

class LoginForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: ""
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.dismissError = this.dismissError.bind(this);
        this.clearOldSession = this.clearOldSession.bind(this);
        

    }
    
    componentDidMount(){
        if(typeof this.props.userDetails !== 'undefined' && this.props.userDetails !== null ){
            console.log(this.props);
            this.setState({username: this.props.userDetails.username});
        }
    }
    
    clearOldSession(){
        this.props.dispatch(clearOldSession())
    }
    
    dismissError(){
        this.props.dispatch(clearAuthError());
    }

    handleSubmit(event){
        event.preventDefault();

          this.props.dispatch(attemptAuthentication({
              username: this.state['username'],
              password: this.state['password']
          }));
        
    }

    handleInputChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }
    
    render(){
        //console.log("this.state.username:", this.state.username);
            return (
            <div className="login-mask">

                <div className="login-logo">
                    <img src={logo} width="320px" alt="Boda Telecom Suite - CE" />
                </div>
                
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <Loading show={this.props.authenticating}/>
                    
                    {this.props.loginError == null ? "" :
                        <div className="alert alert-danger p-2" role="alert">
                            {this.props.loginError}
                        <button type="button" className="close"  aria-label="Close" onClick={this.dismissError}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                    }
                    
                    {typeof this.props.userDetails === 'undefined' || this.props.userDetails === null? 
                        <React.Fragment>
                            <FormGroup
                                label=""
                                labelFor="session_email"

                            >
                                <InputGroup id="session_email" placeholder="Placeholder text" 
                                    leftIcon="user" 
                                    name="username"
                                    onChange={this.handleInputChange} />
                            </FormGroup>
                        </React.Fragment>
                    :''}
                    
                    {typeof this.props.userDetails === 'undefined' || this.props.userDetails === null? '' : 
                        <React.Fragment>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <div className="input-group">
                            <span className="font-weight-light">Login as </span>  &nbsp;
                                <span className="font-weight-bold">{this.props.userDetails.first_name + " " +  this.props.userDetails.last_name}</span>
                            </div>
                            
                        </React.Fragment>     
                    }
                    
                    
                        <FormGroup
                            label=""
                            labelFor="session_password"

                        >
                            <InputGroup id="session_password" placeholder="Password" 
                                leftIcon="lock" 
                                name="password"
                                type="password"
                                onChange={this.handleInputChange} />
                        </FormGroup>


                    <Button type="submit" text="Sign in" intent={Intent.PRIMARY} disabled={this.props.authenticating}/>
                    
                    {typeof this.props.userDetails !== 'undefined' && this.props.userDetails !== null? 
                    <div className="input-group">
                        <a href="#" onClick={this.clearOldSession}>Login as different user</a>
                    </div>
                    :''}
                </form>

            </div>
            );
    }
}

function mapStateToProps(state) {
  return {
    authenticating: state.session.authenticating,
    loginError: state.session.loginError,
    userDetails: state.session.userDetails,
  }
}

export default connect(mapStateToProps)(LoginForm);