import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Plot from 'react-plotly.js';
import { setSidePanel } from '../layout/uilayout-actions';
import { IResizeEntry, ResizeSensor } from "@blueprintjs/core";

class Reports extends React.Component{
    static icon = "chart-area";
    static label = "Reports";
    constructor(props){
        super(props);
        this.setSidePanel = this.setSidePanel.bind(this);
        
    }
    
    setSidePanel(){
        this.props.dispatch(setSidePanel('ReportsPanel'));
    }
    
    render(){
        const height = window.innerHeight - 200;
        return (
        <div>
            <h3><FontAwesomeIcon icon="chart-area"/> Reports</h3>

            <div className="card  mb-2">
                <div className="card-body p-3">
                    <a href="#" className="launch-network-tree" onClick={this.setSidePanel}><FontAwesomeIcon icon="arrow-right"/> Show report tree</a>        
                </div>
            </div>
            
            <div className="card">
                <div className="card-body p-2">
                <Plot
                        data={[
                          {
                            x: [1, 2, 3],
                            y: [2, 6, 3],
                            type: 'scatter',
                            mode: 'lines+points',
                            marker: {color: 'red'},
                          },
                          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                        ]} 
                        useResizeHandler={true} 
                        layout={{autosize: true, title: 'A Fancy Plot'}} 
                        style={{width: "100%", height: height+"px"}}
                      /> 
                </div>
            </div>
        </div>
        );
    }
}

export default connect()(Reports);