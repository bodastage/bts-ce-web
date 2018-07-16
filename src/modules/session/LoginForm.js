import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../../images/logo.svg';

import LoginFormCSS from './LoginForm.css';

export default class LoginForm extends React.Component {
	constructor(props){
		super(props);
	}
	
	handleSubmit(event){
		console.log("handleSubmit");
		event.preventDefault();
	}
	
	render(){
		return (
		<div className="login-mask">
			
			<div className="login-logo">
				<img src={logo} width="320px" alt="Boda Telecom Suite - CE" />
			</div>
				
			<form className="form-signin" onSubmit={this.handleSubmit}>
				<label htmlFor="session_email" className="sr-only">Email address</label>
				<div className="input-group">
					<div className="input-group-prepend">
						<span className="input-group-text"><FontAwesomeIcon icon="at" /></span>
					</div>
					<input type="email" id="session_email" name="session_email" className="form-control" placeholder="Email address" required autoFocus/>
				</div>
				
				
				<label htmlFor="session_password" className="sr-only">Password</label>
				<div className="input-group">
					<div className="input-group-prepend">
						<span className="input-group-text"><FontAwesomeIcon icon="lock" /></span>
					</div>
					<input type="password" id="session_password" name="session_password" className="form-control" placeholder="Password" required/>
				</div>
				
				<button className="btn btn-lg btn-primary btn-block" type="submit" data-placeholder="Sign in">Sign in</button>
			</form>
			
		</div>
		);
	}
}