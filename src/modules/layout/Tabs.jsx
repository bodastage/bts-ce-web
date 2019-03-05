import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dashboard from '../dashboard/Dashboard';
import Settings from '../settings/Settings';
import NetworkBrowser from '../networkbrowser/NetworkBrowser';
import NetworkAudit from '../networkaudit/NetworkAudit';
import MOBrowser from '../mobrowser/MOBrowser';
import TelecomLib from '../telecomlib/Telecomlib';
import Vendors from '../telecomlib/Vendors';
import Technologies from '../telecomlib/Technologies';
import Processes from '../processes/Processes';
import Airflow from '../processes/Airflow';
import RabbitMQ from '../processes/Rabbitmq';
import UserProfile from '../profile/UserProfile';
import Help from '../help/Help';
import Reports from '../reports/Reports';
import TableReport from '../reports/TableReport';
import CreateReport from '../reports/CreateReport';
import GIS from '../gis/gis.js';
import SiteStats from '../performance/siteStats.js';
import MODataBrowser from '../mobrowser/MODataBrowser';
import NMSConnectionDetails from '../settings/NMSConnectionDetails';
import CMScheduler from '../settings/CMScheduler';
import CMDumpLocations from '../settings/CMDumpLocations';
import NetAuditRuleData from '../networkaudit/NetauditRuleData';
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
    "TelecomLib": TelecomLib,
    "Processes": Processes,
    "UserProfile": UserProfile,
    "Vendors": Vendors,
    "Technologies": Technologies,
    "Airflow": Airflow,
    "RabbitMQ": RabbitMQ,
    "Reports": Reports,
    "CreateReport": CreateReport,
    "TableReport": TableReport,
    "GIS": GIS,
    "MODataBrowser": MODataBrowser,
    "NetAuditRuleData": NetAuditRuleData,
    "NMSConnectionDetails": NMSConnectionDetails,
    "CMScheduler": CMScheduler,
    "CMDumpLocations": CMDumpLocations,
    "SiteStats": SiteStats
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
            const activeClass = this.props.activeTab === tabId ? "active show" : ""; 

            tabContents.push(
                    <div key={tabId} className={"tab-pane fade " + activeClass} id={tabId} role="tabpanel" aria-labelledby={ tabId + "-tab"}><Tag options={options}/></div>
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