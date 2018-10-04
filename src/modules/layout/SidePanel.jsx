import React from 'react';
import DashboardSidePanel from '../dashboard/DashboardSidepanel';
import { connect } from 'react-redux';
import AuditRuleTree from '../networkaudit/AuditRuleTree';
import ReportsPanel from '../reports/ReportsPanel';
import MOBrowserPanel from '../mobrowser/MOBrowserPanel';
import NetworkTree from '../networkbrowser/NetworkTree';
import CMSettingsOptions from '../settings/cmSettingsOptions';
import CMDumpLocations from '../settings/cmDumpLocations';

const SidePanels = {
    "DashboardSidePanel": DashboardSidePanel,
    "AuditRuleTree": AuditRuleTree,
    "ReportsPanel": ReportsPanel,
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