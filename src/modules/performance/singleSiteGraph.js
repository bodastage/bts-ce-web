import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Plot from 'react-plotly.js';
import { ResizeSensor } from "@blueprintjs/core";

class SingleSiteGraph extends React.Component {
    constructor(props){
        super(props);
        
        this.handleResize = this.handleResize.bind(this)
        
        this.state = { 
            count: 1,
            width: "100%"
        }
        
        this.data =  [
          {
            x: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
            y: [10, 20, 30, 70, 150, 100, 90, 30, 60],
            type: 'scatter',
            mode: 'lines+points',
            marker: {color: 'red'},
            name: "Utilization"
          }
        ];

        this.layout = { margin: {pad: 2, l: 20, t: 25, r:10}, title: 'Voice Erlang Traffic'}
    }
    
    
    handleResize(resizeEntries){
        this.setState({width: resizeEntries[0].contentRect.width + "px"})
    }
    
    
    render(){
        const height = 300
        
        return (
            <div>
                <Plot
                    config={{displayModeBar: false}}
                    data={this.data}
                    layout={this.layout} 
                    style={{height: height+"px"}}
                /> 
            </div>
        )
    }
}

export default connect()(SingleSiteGraph);