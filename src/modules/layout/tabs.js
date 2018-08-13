import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dashboard from '../dashboard/dashboard';
import Settings from '../settings/settings';
import NetworkBrowser from '../networkbrowser/network-browser';
import ElementBrowser from '../networkbrowser/element-browser';
import NetworkAudit from '../networkaudit/network-audit';
import MOBrowser from '../mobrowser/mo-browser';
import NetworkBaseline from '../networkbaseline/network-baseline';
import TelecomLib from '../telecomlib/telecomlib';
import Vendors from '../telecomlib/vendors';
import Technologies from '../telecomlib/technologies';
import Processes from '../processes/processes';
import Airflow from '../processes/airflow';
import RabbitMQ from '../processes/rabbitmq';
import UserProfile from '../profile/user-profile';
import Help from '../help/help.js';
import Reports from '../reports/reports.js';
import GIS from '../gis/gis.js';
import MODataBrowser from '../mobrowser/mo-data-browser';
import NetAuditRuleData from '../networkaudit/netaudit-rule-data';
import $ from 'jquery';
import { closeTab, setActiveTab } from './uilayout-actions';

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
    "UserProfile": UserProfile,
    "Vendors": Vendors,
    "Technologies": Technologies,
    "Airflow": Airflow,
    "RabbitMQ": RabbitMQ,
    "ElementBrowser": ElementBrowser,
    "Reports": Reports,
    "GIS": GIS,
    "MODataBrowser": MODataBrowser,
    "NetAuditRuleData": NetAuditRuleData,
    };

class Tabs extends React.Component {
    constructor(props){
        super(props);
        
        this.closeTab = this.closeTab.bind(this);
    }

    setActiveTab = (tabId) => (e) => { 
        e.stopPropagation();
        e.preventDefault();
        
        this.props.dispatch(setActiveTab(tabId));
        
    }
    
    closeTab = (tabId) => (e) => { 
        e.stopPropagation();
        e.preventDefault();
        
        this.props.dispatch(closeTab(tabId));
    }
    
    componentDidMount(){
        $('#myTab li #'+this.props.activeTab+"-tab").tab('show');

        $('.nav-tabs').tabdrop({text: '||||'});
        
        $('#myTab').on('shown.bs.tab', function (e) {
            let activeTab = window.activeTab + '-tab';
            $.each($('.tabdrop ul.dropdown-menu li.nav-item>a'),function(index,value){

                if($(value).attr('id') !== activeTab){
                    $(value).removeClass('active show');
                }else{
                    $(value).addClass('active show');
                }
            });
        });

            
    }
	
    componentDidUpdate(){
        $('.nav-tabs').tabdrop('layout');
        $('#myTab li #'+this.props.activeTab+"-tab").tab('show');
        
        //This is used by the shown.bs.tab event which is called in 
        //componentDidMount
        window.activeTab = this.props.activeTab;
      
    } 
    
    componentWillUnmount(){
        $('#myTab').off('shown.bs.tab');        
    }
    
    render(){
        let tabTitles = [];
        for (var tabId in this.props.tabs){
                const Tag = Components[ this.props.tabs[tabId].component];
                const options = this.props.tabs[tabId].options;
                const activeClass = ""; 
        tabTitles.push(
                <React.Fragment key={tabId}>
                    <li className="nav-item" key={tabId}>
                        <a className={"nav-link " + activeClass} id={tabId+"-tab"} data-toggle="tab" href={"#"+tabId} role="tab" aria-controls={tabId} aria-selected="false" onClick={this.setActiveTab(tabId)}>
                        { this.props.tabs[tabId].component === 'Dashboard' ? "" :
                        <button type="button" className="close" aria-label="Close" onClick={this.closeTab(tabId)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        }            
                        <FontAwesomeIcon icon={Tag.icon}/> <span className="tab-label">{options.title}</span>
                        
                        </a>
                    </li>
                </React.Fragment>    
            );
        }
        

        let tabContents = [];
        for( var tabId in this.props.tabs){
            const Tag = Components[ this.props.tabs[tabId].component];
            const options = this.props.tabs[tabId].options;
            const activeClass = ""; 
            tabContents.push(
                <React.Fragment key={tabId}>
                    <div key={tabId} className={"tab-pane fade " + activeClass} id={tabId} role="tabpanel" aria-labelledby="contact-tab"><Tag options={options}/></div>
                </React.Fragment>    
            );
        }
        
        return (
            <div>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="dropdown d-none float-right tabdrop"><a className="dropdown-toggle" data-toggle="dropdown" href="javascript:;"><span className="display-tab"><FontAwesomeIcon icon="list"/></span><b className="caret"></b></a><ul className="dropdown-menu"></ul></li>
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