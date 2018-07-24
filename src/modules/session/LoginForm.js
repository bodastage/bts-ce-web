import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../images/logo.svg';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as sessionActions from './session-actions';
import LoginFormCSS from './LoginForm.css';
import Loading from './loading';
import axios from 'axios';
import { attemptAuthentication } from '../session/session-actions';

class LoginForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: ""
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

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
                        </div>
                    }
                    <label htmlFor="session_email" className="sr-only">Email address</label>
                    <div className="input-group">
                            <div className="input-group-prepend">
                                    <span className="input-group-text"><FontAwesomeIcon icon="at" /></span>
                            </div>
                            <input type="email" id="session_email" onChange={this.handleInputChange}  name="username" className="form-control" placeholder="Email address" required autoFocus/>
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
//  username: PropTypes.string.isRequired,
//  password: PropTypes.string.isRequired,
//  handleInputChange: PropTypes.func.isRequired,
//  onSubmit: PropTypes.func.isRequired
//}

function mapStateToProps(state) {
  return {
    authenticating: state.session.authenticating,
    loginError: state.session.loginError
  }
}

export default connect(mapStateToProps)(LoginForm);