import React from 'react';
import { Tab, Tabs } from "@blueprintjs/core";
import CellViewParameters from './CellViewParameters'
import CellViewKPI from './CellViewKPI'
import CellViewRelations from './CellViewRelations'
import CellViewCoreDefinitions from './CellViewCoreDefs'
import CellViewExternalDefinitions from './CellViewExtDefs'

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
        const height = this.props.panelHeight - 30
        return(
            <div className="card">
                <div className="card-header">
                    Configuration
                </div>
                <div style={{height: height + "px", overflowY: "scroll"}}>
                <Tabs id="TabsExample" onChange={this.handleTabChange} 
                      selectedTabId={this.state.activeTab} 
                      className="p-1" animate={true}>
                    <Tab id="info" title="Parameters" panel={<CellViewParameters cellId={this.props.cellId} panelHeight={this.props.panelHeight}/>}/>
                    <Tab id="nbrs" title="Relations" panel={<CellViewRelations cellId={this.props.cellId} panelHeight={this.props.panelHeight}/>} />
                    <Tab id="core_def" title="Core Definitions" panel={<CellViewCoreDefinitions cellId={this.props.cellId} panelHeight={this.props.panelHeight}/>} />
                    <Tab id="ext_def" title="External Definitions" panel={<CellViewExternalDefinitions cellId={this.props.cellId} panelHeight={this.props.panelHeight}/>} />
                </Tabs>
                </div>
            </div>

        )
    }
}

