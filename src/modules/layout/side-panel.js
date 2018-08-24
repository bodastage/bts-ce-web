import React from 'react';
import DashboardSidePanel from '../dashboard/dashboard-sidepanel';
import { connect } from 'react-redux';
import AuditRuleTree from '../networkaudit/audit-rule-tree';
import ReportsPanel from '../reports/reports-panel';
import MOBrowserPanel from '../mobrowser/mo-panel';

const SidePanels = {
    "DashboardSidePanel": DashboardSidePanel,
    "AuditRuleTree": AuditRuleTree,
    "ReportsPanel": ReportsPanel,
    "MOBrowserPanel": MOBrowserPanel
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