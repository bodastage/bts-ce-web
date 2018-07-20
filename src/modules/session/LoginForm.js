import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../images/logo.svg';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as sessionActions from './session-actions';
import LoginFormCSS from './LoginForm.css';
import Loading from './loading';

class LoginForm extends React.Component {
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleSubmit(event){
        event.preventDefault();

        this.props.dispatch(sessionActions.authenticateUser({
            username: 'btsuser',
            password: 'password'
        }));
        
        //@TODO: Remove
        let logIntoApp  = function(){
            this.props.dispatch(sessionActions.logIntoApp({
                username: 'btsuser',
                password: 'password'
            }));
        }
        
        logIntoApp = logIntoApp.bind(this);
        
        setTimeout(logIntoApp, 1000*10);
        
    }

    handleChange(event){
        const target = event.target;
        const name = event.target.name;
        const value = event.target.value;
        this.state({
            [name]: value
        });
    }
    
    render(){
        console.log("LoginForm.render")
        console.log("this.props.authenticating: " + this.props.authenticating)
            return (
            <div className="login-mask">

                <div className="login-logo">
                        <img src={logo} width="320px" alt="Boda Telecom Suite - CE" />
                </div>

                <div className="login-logo">
                    <Loading show={this.props.authenticating}/>
                </div>
                
                <form className="form-signin" onSubmit={this.handleSubmit}>

                    <label htmlFor="session_email" className="sr-only">Email address</label>
                    <div className="input-group">
                            <div className="input-group-prepend">
                                    <span className="input-group-text"><FontAwesomeIcon icon="at" /></span>
                            </div>
                            <input type="email" id="session_email" onChange={this.handleInputChange}  name="email" className="form-control" placeholder="Email address" required autoFocus/>
                    </div>


                    <label htmlFor="session_password" className="sr-only">Password</label>
                    <div className="input-group">
                            <div className="input-group-prepend">
                                    <span className="input-group-text"><FontAwesomeIcon icon="lock" /></span>
                            </div>
                            <input type="password" id="session_password" onChange={this.handleInputChange} name="password" className="form-control" placeholder="Password" required/>
                    </div>

                    <button className="btn btn-lg btn-primary btn-block" type="submit" data-placeholder="Sign in">Sign in</button>
                </form>

            </div>
            );
    }
}

//LoginForm.propTypes = {
//  email: PropTypes.string.isRequired,
//  password: PropTypes.string.isRequired,
//  onChange: PropTypes.func.isRequired,
//  onSubmit: PropTypes.func.isRequired
//}

function mapStateToProps(state) {
  return {
    authenticating: state.sessionReducer.authenticating
  }
}

export default connect(mapStateToProps)(LoginForm);