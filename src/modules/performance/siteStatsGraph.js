import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js';
import { ResizeSensor } from "@blueprintjs/core";

class SiteStatsGraph extends React.Component {
    constructor(props){
        super(props);
        
        this.handleResize = this.handleResize.bind(this)
        this.updateChartOptions = this.updateChartOptions.bind(this)
        
        this.state = { 
            count: 1,
            width: "100%"
        }
        
        this.data =  [
          {
            x: ["a", "b", "c"],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+points',
            marker: {color: 'red'},
          },
          {type: 'bar', x: ["a", "b", "c"], y: [2, 5, 3]},
        ];

        this.layout = {}
    }
    
    updateChartOptions(){
        let x = []
        let y = []
        for(let k in this.props.range_colors){
            const color = this.props.range_colors[k]
            x.push(color.min)
            y.push(color.count)
        }
        
        this.data =  [
          {
            x: x,
            y: y,
            type: 'scatter',
            mode: 'lines+points',
            marker: {color: 'red'},
            name: "Line"
          },
          {type: 'bar', x: x, y: y, name: "Bar"},
        ];
    }
    
    handleResize(resizeEntries){
        this.setState({width: resizeEntries[0].contentRect.width + "px"})
    }
    
    
    render(){
        const height = this.props.panelHeight-30
        this.updateChartOptions()
        
        return (
            <div>
                <ResizeSensor onResize={this.handleResize}>
                <Plot
                    config={{ modeBarButtonsToRemove: ['sendDataToCloud', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'lasso2d', 'select2d'], displaylogo: false, showTips: true }}
                    data={this.data}
                    useResizeHandler={true} 
                    layout={this.layout} 
                    style={{height: height+"px"}}
                /> 
                </ResizeSensor>    
            </div>
        )
    }
}

export default connect()(SiteStatsGraph);