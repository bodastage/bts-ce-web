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
                <a className="dropdown-item" href="#/netmgt" onClick={this.onClick('NetworkBrowser')}> <FontAwesomeIcon icon="sitemap" /> Network Browser</a>
                <a className="dropdown-item" href="#/netaudit" onClick={this.onClick('NetworkAudit')}><FontAwesomeIcon icon="wrench"/> Network Audit</a>
                <a className="dropdown-item" href="#/mobrowser" onClick={this.onClick('MOBrowser')}><FontAwesomeIcon icon="puzzle-piece"/> MO Browser</a>
                <a className="dropdown-item" href="#/baseline" onClick={this.onClick('NetworkBaseline')}> <FontAwesomeIcon icon="stop-circle"/>  Network Baseline</a>
                <a className="dropdown-item" href="#/telecomlib" onClick={this.onClick('TelecomLib')}> <FontAwesomeIcon icon="university"/>  Telecom Library</a>
                <span className="dropdown-item-text legend w-100">System</span>
                <a className="dropdown-item" href="#" onClick={this.onClick('Processes')}> <FontAwesomeIcon icon="cogs"/>  Processes</a>
                <a className="dropdown-item" href="#" onClick={this.onClick('Settings')}><FontAwesomeIcon icon="cog"/> Settings</a>
                <a className="dropdown-item" href="#" onClick={this.onClick('UserProfile')}><FontAwesomeIcon icon="user"/> Profile</a>
                <a className="dropdown-item" href="#" onClick={this.onClick('Help')}><FontAwesomeIcon icon="question-circle"/>  Help</a>
        </div>
        );
        
    }
}


export default connect()(DashboardSidePanel);
