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
        console.log("this.props.panelHeight:", this.props.panelHeight)
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
                    <Tab id="core_def" title="Core Definitions" panel={<CellViewRelations cellId={this.props.cellId} panelHeight={this.props.panelHeight}/>} />
                    <Tab id="ext_def" title="External Definitions" panel={<CellViewRelations cellId={this.props.cellId} panelHeight={this.props.panelHeight}/>} />
                </Tabs>
                </div>
            </div>

        )
    }
}

