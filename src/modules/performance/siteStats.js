import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Button, Card, Elevation, ResizeSensor, MenuItem, HTMLSelect } from "@blueprintjs/core";
import '../../../node_modules/react-grid-layout/css/styles.css'
import '../../../node_modules/react-resizable/css/styles.css'
import {AgGridReact} from 'ag-grid-react';
import GridLayout , { WidthProvider, Responsive  } from 'react-grid-layout';
import SiteStatsTable from './siteStatsTable'
import SiteStatsMap from './siteStatsMap'
import { getSiteStats } from './performance-actions';
import SiteStatsKeys from './siteStatsKeys';
import SiteStatsGraph from './siteStatsGraph';
import './site-stats.css'
import { Select } from "@blueprintjs/select";

class SiteStats extends React.Component {
    static icon = "chart-line";
    static label = "Performace"
    
    constructor(props){
        super(props);
        
        /*
         * List of KPI to display on the map
         */
        this.KPIList  = [
            {label:"Voice Erlang Traffic", value: "voice_erlang_capacity"},
            {label:"Utilization", value: "utilization"},
            {label:"HR Rate Traffic", value: "hr_rate_traffic"},
            {label:"Congestion", value: "congestion"}
        ]
        const initPanelHeight = (window.innerHeight - 150)/2 - 30
        
        this.state = {
            width: 1200,
            rowHeight: (window.innerHeight - 150)/4,
            mapHeight: initPanelHeight,
            keyHeight: initPanelHeight,
            dataHeight: initPanelHeight,
            graphHeight: initPanelHeight,
            fields: [],
            countsUpdated: false,
            kpi: this.KPIList[0].value,
            aggregate_level: 'sites'
        }
        
        this.handleResize = this.handleResize.bind(this)
        this.onLayoutChange = this.onLayoutChange.bind(this)
        this.onChangeKPI = this.onChangeKPI.bind(this);
        this.onChangeAggragateLevel = this.onChangeAggragateLevel.bind(this);
        
        /**
         * Color map for each KPI
         */
        this.colors = {
                "congestion": [
                {min:99, max:100, color: "#D99E0B", count: 0},
                {min:95, max:99, color: "#F2B824", count: 0},
                {min:90, max:95, color: "#FFC940", count: 0},
                {min:0, max:95, color: "#008075", count: 0},
            ],
            "hr_rate_traffic": [
                {min:99, max:100, color: "#1F4B99", count: 0},
                {min:95, max:99, color: "#2458B3", count: 0},
                {min:90, max:95, color: "#2965CC", count: 0},
                {min:0, max:95, color: "#4580E6", count: 0},
            ],
            "utilization": [
                {min:99, max:100, color: "#A82A2A", count: 0},
                {min:95, max:99, color: "#C23030", count: 0},
                {min:90, max:95, color: "#DB3737", count: 0},
                {min:0, max:95, color: "#F55656", count: 0},
            ],
            "voice_erlang_capacity": [
                {min:120, max:1000000, color: "#A82A2A", count: 0},
                {min:115, max:120, color: "#C23030", count: 0},
                {min:110, max:115, color: "#DB3737", count: 0},
                {min:105, max:110, color: "#F55656", count: 0},
                {min:100, max:105, color: "#F55656", count: 0},
                {min:95,  max:100, color: "#FF7373", count: 0},
                {min:90,  max:95,  color: "#A66321", count: 0},
                {min:85,  max:90,  color: "#BF7326", count: 0},
                {min:80,  max:85,  color: "#D9822B", count: 0},
                {min:75,  max:80,  color: "#F29D49", count: 0},
                {min:70,  max:75,  color: "#FFB366", count: 0},
                {min:65,  max:70,  color: "#A67908", count: 0},
                {min:60,  max:65,  color: "#BF8C0A", count: 0},
                {min:55,  max:60, color: "#D99E0B", count: 0},
                {min:50, max:55, color: "#F2B824", count: 0},
                {min:45, max:50, color: "#FFC940", count: 0},
                {min:40, max:45, color: "#008075", count: 0},
                {min:35, max:40, color: "#00998C", count: 0},
                {min:30, max:35, color: "#00B3A4", count: 0},
                {min:25, max:30, color: "#14CCBD", count: 0},
                {min:20, max:25, color: "#2EE6D6", count: 0},
                {min:15, max:20, color: "#1F4B99", count: 0},
                {min:10, max:15, color: "#2458B3", count: 0},
                {min:5, max:10, color: "#2965CC", count: 0},
                {min:0, max:5, color: "#4580E6", count: 0}
            ]
        }

        
        this.color_palete = [
            {min:120, max:1000000, color: "#A82A2A", count: 0},
            {min:115, max:120, color: "#C23030", count: 0},
            {min:110, max:115, color: "#DB3737", count: 0},
            {min:105, max:110, color: "#F55656", count: 0},
            {min:100, max:105, color: "#F55656", count: 0},
            {min:95,  max:100, color: "#FF7373", count: 0},
            {min:90,  max:95,  color: "#A66321", count: 0},
            {min:85,  max:90,  color: "#BF7326", count: 0},
            {min:80,  max:85,  color: "#D9822B", count: 0},
            {min:75,  max:80,  color: "#F29D49", count: 0},
            {min:70,  max:75,  color: "#FFB366", count: 0},
            {min:65,  max:70,  color: "#A67908", count: 0},
            {min:60,  max:65,  color: "#BF8C0A", count: 0},
            {min:55,  max:60, color: "#D99E0B", count: 0},
            {min:50, max:55, color: "#F2B824", count: 0},
            {min:45, max:50, color: "#FFC940", count: 0},
            {min:40, max:45, color: "#008075", count: 0},
            {min:35, max:40, color: "#00998C", count: 0},
            {min:30, max:35, color: "#00B3A4", count: 0},
            {min:25, max:30, color: "#14CCBD", count: 0},
            {min:20, max:25, color: "#2EE6D6", count: 0},
            {min:15, max:20, color: "#1F4B99", count: 0},
            {min:10, max:15, color: "#2458B3", count: 0},
            {min:5, max:10, color: "#2965CC", count: 0},
            {min:0, max:5, color: "#4580E6", count: 0}
        ]
    }

    /**
     * Handle changes to map aggreate level
     */
    onChangeAggragateLevel = (e) => {
        this.setState({"aggregate_level": e.target.value})
    }

    /**
     * Handle changes to KPI list
     */
    onChangeKPI = (e) => {
        this.setState({"kpi": e.target.value})
    }
    
    componentDidMount(){
        if(this.props.fetching_done === false){
            this.props.dispatch(getSiteStats(this.props.request_state));            
        }
        
        if(this.state.countsUpdated === false){
            for(let k in this.props.data){
                const val = this.props.data[k].voice_erlang_capacity
                for(let c in this.color_palete){
                    const col = this.color_palete[c]
                    if(val >= col.min && val <= col.max){
                        this.color_palete[c].count += 1
                    }
                }
            }
        }
    }
    
    componentDidUpdate(){

    }
    
    handleResize(resizeEntries){
        this.setState({width: resizeEntries[0].contentRect.width})
    }
    
    onLayoutChange(layout){
        
        const rowHeight = this.state.rowHeight;
        const mapHeight = rowHeight * layout[0].h;
        const keyHeight  = rowHeight * layout[1].h
        const dataHeight  = rowHeight * layout[2].h
        const graphHeight  = rowHeight * layout[3].h
        
        this.setState(
            {
                mapHeight: mapHeight,
                keyHeight: keyHeight,
                dataHeight: dataHeight,
                graphHeight: graphHeight
            })
    }
    
    componentDidUpdate(prevProps){
        if(this.props.fetching_done === false){
            this.props.dispatch(getSiteStats(this.props.request_state));            
        }
    }
    
    render(){
        var layout = [
          {i: 'a', x: 0, y: 0, w: 3, h: 3},
          {i: 'b', x: 3, y: 0, w: 1, h: 3},
          {i: 'c', x: 0, y: 2, w: 3, h: 2},
          {i: 'd', x: 3, y: 2, w: 1, h: 2}
        ];
        
        return (
        <div className="cell-view">
           <h3><FontAwesomeIcon icon="chart-line"/>Performance</h3>
           <div><ResizeSensor onResize={this.handleResize}>
            <GridLayout className="layout" 
                onLayoutChange={this.onLayoutChange}
              draggableHandle=".card-header"
              layout={layout} 
              cols={4} 
              margin={[5,5]}
              rowHeight={this.state.rowHeight} width={this.state.width}>
              <div key="a" className="rgl-border">
                  <div className="card">
                    <div className="card-header">
                        
                        <Button minimal={true}>&nbsp;Aggregate at&nbsp;</Button> 
                        <HTMLSelect minimal={true} 
                        onChange={this.onChangeAggragateLevel}
                        options={[
                            {label:"Sites", value: "sites"},
                            {label:"Regions", value: "regions"}
                        ]}>
                        </HTMLSelect>
                    </div>
                    <div style={{heigth: this.state.mapHeight+"px", overflowY: "scroll"}}>
                        <SiteStatsMap data={this.props.data} 
                            panelHeight={this.state.mapHeight} 
                            kpi={this.state.kpi} 
                            range_colors={this.colors[this.state.kpi]}
                            aggregate_level={this.state.aggregate_level}/>
                    </div>
                  </div>

              </div>
              <div key="b" className="rgl-border">
                <div className="card-header">
                    <HTMLSelect 
                        onChange={this.onChangeKPI}
                        minimal={true} 
                        options={this.KPIList}></HTMLSelect>
                </div>
                <div style={{height: this.state.keyHeight-30, overflowY: "scroll"}}>
                    <SiteStatsKeys range_colors={this.colors[this.state.kpi]} kpi={this.state.kpi}/>
                </div>
                
              </div>
              <div key="c" className="rgl-border">
                  <div className="card">
                    <div className="card-header">

                        <HTMLSelect minimal={true} 
                        options={[
                            {label:"Top 10", value: "top_10"},
                            {label:"Lowest 10", value: "lowest_10"},
                            {label:"Top 10 increased", value: "region"}
                        ]}>
                        </HTMLSelect>
                        <HTMLSelect minimal={true} 
                        options={[
                            {label:"Sites", value: "site"},
                            {label:"Regions", value: "region"}
                        ]}>
                        </HTMLSelect>
                        <Button minimal={true}>&nbsp;by&nbsp;</Button> 
                        <HTMLSelect minimal={true} 
                        options={[
                            {label:"Voice Erlang Traffic", value: "voice_erlang_capacity"},
                            {label:"Utilization", value: "utilization"},
                            {label:"Congestion", value: "congestion"}
                        ]}>
                        </HTMLSelect>
                        
                    </div>
                    <div style={{ overflowY: "scroll"}}>
                        <SiteStatsTable data={this.props.data} 
                        panelHeight={this.state.dataHeight} 
                        range_colors={this.colors[this.state.kpi]}
                        kpi={this.state.kpi}/>
                    </div>
                  </div>    
              </div>

              <div key="d" className="rgl-border">
                  <div className="card">
                    <div className="card-header">
                      Graph - Counts per range
                    </div>
                    <div style={{ overflowY: "scroll"}}>
                        <SiteStatsGraph range_colors={this.color_palete} panelHeight={this.state.graphHeight} data={this.props.data}/>
                    </div>
                  </div>    
              </div>
              
            </GridLayout>
          </ResizeSensor></div>
        </div>
        )
    }
}

function mapStateToProps(state){
    return {
        fetching_done : state.performance.site_stats.fetching_done,
        data : state.performance.site_stats.data,
        request_state : state.performance.site_stats.request_state,
    }
}

export default connect(mapStateToProps)(SiteStats);