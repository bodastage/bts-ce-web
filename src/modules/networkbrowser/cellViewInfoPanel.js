import React from 'react';
import { Tab, Tabs } from "@blueprintjs/core";
import CellViewParameters from './cellViewParameters'
import CellViewKPI from './cellViewKPI'
import CellViewRelations from './cellViewRelations'

export default class CellViewInfoPanel extends React.Component{
    constructor(props){
        super(props);
        
        this.handleTabChange = this.handleTabChange.bind(this)
        
        this.state = {
            "activeTab": "info"
        }
    }
    
    handleTabChange = (navbarTabId) => this.setState({ activeTab: navbarTabId });
    
    render(){
        return(
            <Tabs id="TabsExample" onChange={this.handleTabChange} selectedTabId={this.state.activeTab} className="p-1" animate={true}>
                <Tab id="info" title="Parameters" panel={<CellViewParameters />} />
                <Tab id="kpi" title="KPIs" panel={<CellViewKPI />} />
                <Tab id="nbrs" title="Relations" panel={<CellViewRelations />} />
                <Tabs.Expander />
                <input className="bp3-input" type="text" placeholder="Search..." />
            </Tabs>
        )
    }
}

