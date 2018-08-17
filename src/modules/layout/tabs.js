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
import { Breadcrumb, OverflowList, Boundary, Position, Classes, MenuItem, 
    Popover, Menu, Icon } from "@blueprintjs/core";

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
        this.renderOverflow = this.renderOverflow.bind(this);
        this.renderBreadcrumb = this.renderBreadcrumb.bind(this);
        this.renderOverflow = this.renderOverflow.bind(this);
        
        this.state = {
            collapseFrom: Boundary.END,
            width: 50,
        }
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
            
    }
	
    componentDidUpdate(){
      
    } 
    
    componentWillUnmount(){      
    }
    
    renderOverflow = (items) => {
        const { collapseFrom } = this.state;
        const position = collapseFrom === Boundary.END ? Position.BOTTOM_RIGHT : Position.BOTTOM_LEFT;
        let orderedItems = items;
        if (this.state.collapseFrom === Boundary.START) {
            orderedItems = items.slice().reverse();
        }
        const menuItems = orderedItems.map(
                (item, index) => <MenuItem {...item} key={index} 
                                    onClick={this.setActiveTab(item.tabid)} 
                                    labelElement={<Icon icon="cross" onClick={this.closeTab(item.tabid)}/>} />);
        return (
            <li>
                <Popover position={position}>
                    <span className={Classes.BREADCRUMBS_COLLAPSED} />
                    <Menu>{menuItems}</Menu>
                </Popover>
            </li>
        );
    };
    
    renderBreadcrumb(props: IMenuItemProps, index: number) {
        const tabId = props.tabid;
        const Tag = Components[ this.props.tabs[tabId].component];
        const options = this.props.tabs[tabId].options;
        
        const activeClass = this.props.activeTab === tabId ? 'active show' : ""; 
        
        return (
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
        );
    }
    
    render(){
        let tabContents = [];
        for( let tabId in this.props.tabs){
            const Tag = Components[ this.props.tabs[tabId].component];
            const options = this.props.tabs[tabId].options;
            const activeClass = this.props.activeTab === tabId ? 'active show' : ""; 
            tabContents.push(
                <React.Fragment key={tabId}>
                    <div key={tabId} className={"tab-pane fade " + activeClass} id={tabId} role="tabpanel" aria-labelledby="contact-tab"><Tag options={options}/></div>
                </React.Fragment>    
            );
        }
        
        const { collapseFrom, width } = this.state;
        let items = [];
        for (var tabId in this.props.tabs){
            const Tag = Components[ this.props.tabs[tabId].component];
            const options = this.props.tabs[tabId].options;
            const activeClass = ""; 
            items.push(
                {   href: "#", 
                    icon: <FontAwesomeIcon icon={Tag.icon}/>, 
                    text: options.title, tabid: tabId
                }
            );
        }
        return (
            <div>
                <ul className="nav nav-tabs" id="bts_tabs" role="tablist">
                    <OverflowList
                        collapseFrom={collapseFrom}
                        items={items}
                        overflowRenderer={this.renderOverflow}
                        visibleItemRenderer={this.renderBreadcrumb}
                        observeParents={true}
                        />
                    
                </ul>
                
                <div className="tab-content" id="bts_tabs_content">
                    {tabContents}
                </div>      
            </div>
        );
    }
}

export default connect()(Tabs);