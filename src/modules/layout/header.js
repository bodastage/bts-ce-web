import React from 'react'
import jQuery from '../../utils/jquery';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import logo from '../../images/logo-no-text.svg';

class Header extends React.Component {
    constructor(props){
        super(props);
        
        this.logout = this.logout.bind(this);
    }
    
    logout(event){
        event.preventDefault();
        
        this.props.dispatch({
            type: "LOGOUT"
        });
    }
    
    addTab = (name) => (e) => { 
        e.preventDefault();
        
        this.props.dispatch({
            type: 'ADD_TAB',
            id: name,
            component: name,
            options: {}
        });
        
        $('#myTab li #'+this.props.activeTab+"-tab").tab('show');
    }
    
    render(){   
        return (
            <div className="navbar-nav d-flex flex-column flex-md-row align-items-center px-md-2  bg-white">
              <h5 className="my-0 mr-md-auto font-weight-normal">
              <img src={logo} width="30px" alt="Boda Telecom Suite - CE" /> &nbsp;
                Boda Telecom Suite - CE
              </h5>
              
              <nav className="my-2 my-md-0 mr-md-3">
                <a className="text-dark" href="#" onClick={this.addTab('Dashboard')}><FontAwesomeIcon icon="home" className="mb-1"/> Dashboard</a>
                <a className="p-2 text-secondary" href="#"><FontAwesomeIcon icon="plug" className="mb-1"/> Modules</a>
                <a className="p-2 text-secondary" href="#" onClick={this.addTab('Settings')}><FontAwesomeIcon icon="cog" className="mb-1"/> Settings</a>
                <a className="p-2 text-secondary" href="#" onClick={this.addTab('Help')}><FontAwesomeIcon icon="question-circle" className="mb-1"/> Help</a>
                <a className="p-2 text-secondary" href="#" onClick={this.addTab('UserProfile')}><FontAwesomeIcon icon="user" className="mb-1"/> {this.props.userDetails.first_name}</a>
                <a className="p-2 text-secondary" href="#"><FontAwesomeIcon icon="power-off" className="mb-1" onClick={this.logout}/></a>
                
              </nav>
            </div> 
        );
    
    }
    
}

function mapStateToProps(state) {
  return {
    userDetails: state.session.userDetails
  }
}

export default connect(mapStateToProps)(Header);