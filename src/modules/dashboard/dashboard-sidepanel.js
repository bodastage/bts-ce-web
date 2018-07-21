import React from 'react'
import jQuery from '../../utils/jquery';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as DashboardCSS from './dashboard.css';
import { connect } from 'react-redux';

class DashboardSidePanel extends React.Component {
    constructor(props){
        super(props);
        
        this.onClick = this.onClick.bind(this);

    }
    
    onClick = (name) => (e) => { 
        e.preventDefault();
        
        this.props.dispatch({
            type: 'ADD_TAB',
            tab: name
        });
    }
    
    render(){
        return (
        <div>
                <span className="dropdown-item-text legend w-100">Radio Access Network</span>
                <a className="dropdown-item" href="#/netmgt"> <FontAwesomeIcon icon="sitemap" /> Network Browser</a>
                <a className="dropdown-item" href="#/netaudit" ><FontAwesomeIcon icon="wrench"/> Network Audit</a>
                <a className="dropdown-item" href="#/mobrowser" ><FontAwesomeIcon icon="puzzle-piece"/> MO Browser</a>
                <a className="dropdown-item" href="#/baseline"> <FontAwesomeIcon icon="stop-circle"/>  Baseline Values</a>
                <a className="dropdown-item" href="#/telecomlib"> <FontAwesomeIcon icon="university"/>  Telecom Library</a>
                <span className="dropdown-item-text legend w-100">System</span>
                <a className="dropdown-item" href="#"> <FontAwesomeIcon icon="cogs"/>  Processes</a>
                <a className="dropdown-item" href="#" onClick={this.onClick('Settings')}><FontAwesomeIcon icon="cog"/> Settings</a>
                <a className="dropdown-item" href="#" onClick={this.onClick('Profile')}><FontAwesomeIcon icon="user"/> Profile</a>
                <a className="dropdown-item" href="#" onClick={this.onClick('Help')}><FontAwesomeIcon icon="question-circle"/>  Help</a>
        </div>
        );
        
    }
}


export default connect()(DashboardSidePanel);
