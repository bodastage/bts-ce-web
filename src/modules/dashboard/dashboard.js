import React from 'react'
import jQuery from '../../utils/jquery';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as DashboardCSS from './dashboard.css';
import { connect } from 'react-redux';

//import * as UILayoutActions from './uilayout-actions';

class Dashboard extends React.Component {
    
    static icon = "home";
    static label = "Dashboard"
    
    constructor(props){
        super(props);
        
        this.addTab = this.addTab.bind(this);

    }
    
    
    addTab = (name) => (e) => { 
        e.preventDefault();
        
        this.props.dispatch({
            type: 'ADD_TAB',
            tab: name
        });
        
        $('#myTab li #'+this.props.activeTab+"-tab").tab('show');
    }
    
    render(){   
        return (

            <div>
                <fieldset className="col-md-12 fieldset">    	
                    <legend className="legend">Radio Access Network</legend>
                    
                        <div className="row dashboard-icon">
                            <div className="col-md-2">
                                <div className="icon-display"><a href="#/netmgt" onClick={this.addTab('NetworkBrowser')}> <FontAwesomeIcon icon="sitemap" /></a></div>
                                <div className="icon-label">Network Browser</div>
                            </div>

                            <div className="col-md-2">
                                <div className="icon-display" title="Network Audit Module"><a href="#/netaudit" onClick={this.addTab('NetworkAudit')}><FontAwesomeIcon icon="wrench"/></a></div>
                                <div className="icon-label">Network Audit</div>
                            </div>
                            <div className="col-md-2">
                                <div className="icon-display"><a href="#/mobrowser" title="Managed Object Browser" onClick={this.addTab('MOBrowser')}> <FontAwesomeIcon icon="puzzle-piece"/></a></div>
                                <div className="icon-label">MO Browser</div>
                            </div>

                            <div className="col-md-2">
                            <div className="icon-display"><a href="#/baseline" onClick={this.addTab('NetworkBaseline')}> <FontAwesomeIcon icon="stop-circle"/></a></div>
                                <div className="icon-label">Network Baseline</div>
                            </div>

                            <div className="col-md-2">
                            <div className="icon-display"><a href="#/telecomlib" onClick={this.addTab('TelecomLib')}> <FontAwesomeIcon icon="university"/></a></div>
                                <div className="icon-label">Telecom Library</div>
                            </div>

                        </div>                    
                </fieldset>		
                
                <fieldset className="col-md-12 fieldset">    	
                    <legend className="legend">System</legend>
                    
                    <div className="row dashboard-icon">
                        <div className="col-md-2">
                            <div className="icon-display"><a href="#/processes" onClick={this.addTab('Processes')}><FontAwesomeIcon icon="cogs"/></a></div>
                            <div className="icon-label">Processes</div>
                        </div>

                        <div className="col-md-2">
                            <div className="icon-display"><a href="#/profile" onClick={this.addTab('UserProfile')}><FontAwesomeIcon icon="user"/></a></div>
                            <div className="icon-label">Profile</div>
                        </div>

                        <div className="col-md-2">
                        <div className="icon-display"><a href="#" onClick={this.addTab('Settings')}><FontAwesomeIcon icon="cog"/></a></div>
                            <div className="icon-label">Settings</div>
                        </div>

                        <div className="col-md-2">
                            <div className="icon-display"><a href="#/help" onClick={this.addTab('Help')}><FontAwesomeIcon icon="question-circle"/></a></div>
                            <div className="icon-label">Help</div>
                        </div>
                    </div>
                </fieldset>
            </div>
        );
    }
    
}

//function mapStateToProps(state) {
//  return {
//    tabs: state.tabs
//  }
//}
//
//export default connect(mapStateToProps)(Dashboard);
    
export default connect()(Dashboard)