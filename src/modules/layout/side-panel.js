import React from 'react';
import DashboardSidePanel from '../dashboard/dashboard-sidepanel';
import { connect } from 'react-redux';
import AuditRuleTree from '../networkaudit/audit-rule-tree';
import ReportsPanel from '../reports/reports-panel';
import MOBrowserPanel from '../mobrowser/mo-panel';
import NetworkTree from '../networkbrowser/networkTree';
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