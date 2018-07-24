import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DashboardSidePanel from '../dashboard/dashboard-sidepanel';
import { connect } from 'react-redux';

const SidePanels = {
    "DashboardSidePanel": DashboardSidePanel
};
class SidePanel extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const CurrentPanel = SidePanels[this.props.panel] || DashboardSidePanel;
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