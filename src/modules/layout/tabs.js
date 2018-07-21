import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dashboard from '../dashboard/dashboard';
import Settings from '../settings/settings';
import NetworkBrowser from '../networkbrowser/network-browser';
import NetworkAudit from '../networkaudit/network-audit';
import MOBrowser from '../mobrowser/mo-browser';
import NetworkBaseline from '../networkbaseline/network-baseline';
import TelecomLib from '../telecomlib/telecomlib';
import Processes from '../processes/processes';
import UserProfile from '../profile/user-profile';
import Help from '../help/help.js';
import $ from 'jquery';

const Components = {
    "Help": Help,
    "Dashboard": Dashboard,
    "Settings": Settings,
    "NetworkBrowser": NetworkBrowser,
    "NetworkAudit": NetworkAudit,
    "MOBrowser": MOBrowser,
    "NetworkBaseline": NetworkBaseline,
    "TelecomLib": TelecomLib,
    "Processes": Processes,
    "UserProfile": UserProfile
    };

class Tabs extends React.Component {
    constructor(props){
        super(props);
        
        this.closeTab = this.closeTab.bind(this);
    }
    
    loadModule(event){
        event.preventDefault();
    }

    setActiveTab = (name) => (e) => { 
        e.stopPropagation();
        e.preventDefault();
        
        this.props.dispatch({
            type: 'SET_ACTIVE_TAB',
            tab: name
        });
        
    }
    
    closeTab = (name) => (e) => { 
        e.stopPropagation();
        e.preventDefault();
        
        this.props.dispatch({
            type: 'CLOSE_TAB',
            tab: name
        });
    }
    
    componentDidMount(){
        $('#myTab li #'+this.props.activeTab+"-tab").tab('show');

        $('.nav-tabs').tabdrop({text: '||||'});
        
        

            
    }
	
    componentDidUpdate(){
        
        $('.nav-tabs').tabdrop('layout');
        $('#myTab li #'+this.props.activeTab+"-tab").tab('show');
        
        var activeTab = this.props.activeTab + '-tab';
        $('#myTab').on('shown.bs.tab', function (e) {
            $.each($('.tabdrop ul.dropdown-menu li.nav-item>a'),function(index,value){
                  if($(value).attr('id') !== activeTab){
                      $(value).removeClass('active show');
                  }else{
                      $(value).addClass('active show');
                  }
            });
        });


    } 
    
    componentWillUnmount(){
        $('#myTab').off('shown.bs.tab');
        
        
        //@todo: Remove any registered jquery events
    }
    
    render(){
        let tabTitles = this.props.tabs.map( tab => {
                const Tag = Components[tab];
//                const activeClass = tab === this.props.activeTab ? 'active show': ""; 
                const activeClass = ""; 
                return (
                <React.Fragment key={tab}>
                    <li className="nav-item" key={tab}>
                        <a className={"nav-link " + activeClass} id={tab+"-tab"} data-toggle="tab" href={"#"+tab} role="tab" aria-controls={tab} aria-selected="false" onClick={this.setActiveTab(tab)}>
                        { tab === 'Dashboard' ? "" :
                        <button type="button" className="close" aria-label="Close" onClick={this.closeTab(tab)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        }            
                        <FontAwesomeIcon icon={Tag.icon}/> <span className="tab-label">{Tag.label}</span>
                        
                        </a>
                    </li>
                </React.Fragment>    
            );   
        });
        
        let tabContents = this.props.tabs.map( tab => {
            const Tag = Components[tab];
//            const activeClass = tab === this.props.activeTab ? 'active show': ""; 
            const activeClass = ""; 
            return (
                <React.Fragment key={tab}>
                    <div className={"tab-pane fade " + activeClass} id={tab} role="tabpanel" aria-labelledby="contact-tab"><Tag/></div>
                </React.Fragment>
            );
        });
        
        return (
            <div>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  {tabTitles}
                </ul>
                
                <div className="tab-content" id="myTabContent">
                    {tabContents}
                </div>      
            </div>
        );
    }
}

export default connect()(Tabs);