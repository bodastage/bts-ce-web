import React from 'react'
import jQuery from '../../utils/jquery';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as DashboardCSS from './dashboard.css';
import { connect } from 'react-redux';
import { addTab } from '../layout/uilayout-actions';

class DashboardSidePanel extends React.Component {
    constructor(props){
        super(props);
        
        this.addTab = this.addTab.bind(this);

    }
    
    addTab = (options) => (e) => { 
        e.preventDefault();

        let tabId = options.component;
        this.props.dispatch(addTab(tabId, options.component, {title: options.title}));
                
        $('#myTab li #'+this.props.activeTab+"-tab").tab('show');
    }
    
    render(){
        return (
        <div>
                <span className="dropdown-item-text legend w-100">Radio Access Network</span>
                <a className="dropdown-item" href="#" onClick={this.addTab({
                                component: 'NetworkBrowser',
                                title: 'Network Browser'
                                })}> <FontAwesomeIcon icon="sitemap" /> Network Browser</a>
                                
                <a className="dropdown-item" href="#" onClick={this.addTab({
                                    component: 'NetworkAudit',
                                    title: 'Network Audit'
                                })}><FontAwesomeIcon icon="wrench"/> Network Audit</a>
                                
                <a className="dropdown-item" href="#" onClick={this.addTab({
                                    component: 'MOBrowser',
                                    title: 'MO Browser'})}><FontAwesomeIcon icon="puzzle-piece"/> MO Browser</a>
                                    
                <a className="dropdown-item" href="#" onClick={this.addTab({
                                    component: 'NetworkBaseline',
                                    title: 'Network Baseline'
                                })}> <FontAwesomeIcon icon="stop-circle"/>  Network Baseline</a>
                                
                <a className="dropdown-item" href="#" onClick={this.addTab({
                                component: 'TelecomLib',
                                title: 'Telecom Library'
                                })}> <FontAwesomeIcon icon="university"/>  Telecom Library</a>
                                
                <span className="dropdown-item-text legend w-100">Service Assurance</span>
                <a className="dropdown-item text-muted" href="#" onClick={this.addTab('Reports')}> <FontAwesomeIcon icon="chart-area"/>  Reports</a>
                <a className="dropdown-item text-muted" href="#" > <FontAwesomeIcon icon="brain"/>  SON</a>
                <a className="dropdown-item text-muted" href="#" title="Customer Experience Management"> <FontAwesomeIcon icon="gem"/>  CEM</a>
                <a className="dropdown-item text-muted" href="#" title="Fault Management" > <FontAwesomeIcon icon="user-md"/>  Faults</a>
                <a className="dropdown-item text-muted" href="#" title="Geographical Information Services"> <FontAwesomeIcon icon="globe-africa"/>  GIS</a>
                <a className="dropdown-item text-muted" href="#" title="Works Authorisation"> <FontAwesomeIcon icon="people-carry"/>  WorkFlow</a>
                <span className="dropdown-item-text legend w-100">System</span>
                <a className="dropdown-item" href="#" onClick={this.addTab({
                                component: 'Processes', title: 'Processes'})}> <FontAwesomeIcon icon="cogs"/>  Processes</a>
                                
                <a className="dropdown-item" href="#" onClick={this.addTab({
                            component: 'Settings', title: 'Settings'})}><FontAwesomeIcon icon="cog"/> Settings</a>
                            
                <a className="dropdown-item" href="#" 
                    onClick={this.addTab({ component: 'UserProfile', title:'Profile'})}>
                    <FontAwesomeIcon icon="user"/> Profile</a>
                                
                <a className="dropdown-item" href="#" onClick={this.addTab({
                                component: 'Help', title: 'Help'})}><FontAwesomeIcon icon="question-circle"/>  Help</a>
        </div>
        );
        
    }
}


export default connect()(DashboardSidePanel);
