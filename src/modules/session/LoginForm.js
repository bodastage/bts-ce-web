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
                        <div className="alert alert-danger" role="alert">
                            {this.props.loginError}
                        <button type="button" className="close"  aria-label="Close" onClick={this.dismissError}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                    }
                    
                    {typeof this.props.userDetails === 'undefined' || this.props.userDetails === null? 
                        <React.Fragment>
                            <label htmlFor="session_email" className="sr-only">Email address</label>
                            <div className="input-group">
                                    <div className="input-group-prepend">
                                            <span className="input-group-text"><FontAwesomeIcon icon="at" /></span>
                                    </div>
                                    <input type="email" id="session_email" 
                                        value={this.state.username || ''}  
                                        onChange={this.handleInputChange}  
                                        name="username" className="form-control" placeholder="Email address" required autoFocus
                                       />
                            </div>
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
                    
                    <label htmlFor="session_password" className="sr-only">Password</label>
                    <div className="input-group">
                            <div className="input-group-prepend">
                                    <span className="input-group-text"><FontAwesomeIcon icon="lock" /></span>
                            </div>
                            <input type="password" id="session_password" onChange={this.handleInputChange} name="password" className="form-control" placeholder="Password" required/>
                    </div>

                    <button className="btn btn-lg btn-primary btn-block" type="submit" data-placeholder="Sign in">Sign in</button>
                    
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

//LoginForm.propTypes = {
//  username: PropTypes.string.isRequired,
//  password: PropTypes.string.isRequired,
//  handleInputChange: PropTypes.func.isRequired,
//  onSubmit: PropTypes.func.isRequired
//}

function mapStateToProps(state) {
  return {
    authenticating: state.session.authenticating,
    loginError: state.session.loginError,
    userDetails: state.session.userDetails,
  }
}

export default connect(mapStateToProps)(LoginForm);