import React from 'react';
import DashboardSidePanel from '../dashboard/DashboardSidepanel';
import { connect } from 'react-redux';
import AuditRuleTree from '../networkaudit/AuditRuleTree';
import ReportsTree from '../reports/ReportsTree';
import MOBrowserPanel from '../mobrowser/MOBrowserPanel';
import NetworkTree from '../networkbrowser/NetworkTree';
import CMSettingsOptions from '../settings/CMSettingsOptions';
import CMDumpLocations from '../settings/CMDumpLocations';
import './sidepanel.css'

const SidePanels = {
    "DashboardSidePanel": DashboardSidePanel,
    "AuditRuleTree": AuditRuleTree,
    "ReportsTree": ReportsTree,
    "MOBrowserPanel": MOBrowserPanel,
    "NetworkTree": NetworkTree,
    "CMSettingsOptions": CMSettingsOptions,
    "CMDumpLocations": CMDumpLocations,
};

class SidePanel extends React.Component{
    render(){
        const CurrentPanel = SidePanels[this.props.activePanel] || DashboardSidePanel;
        return (
                <CurrentPanel/>
        );
        
    }
    
}

function mapStateToProps(state) {
  return {
    activePanel: state.uiLayout.activePanel
  }
}

export default connect(mapStateToProps)(SidePanel);