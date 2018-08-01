import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Plot from 'react-plotly.js';
import { setSidePanel } from '../layout/uilayout-actions';

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
        return (
        <div>
            <h3><FontAwesomeIcon icon="chart-area"/> Reports</h3>

            <div className="card  mb-2">
                <div className="card-body p-3">
                    <a href="#" className="launch-network-tree" onClick={this.setSidePanel}><FontAwesomeIcon icon="arrow-right"/> Show report tree</a>        
                </div>
            </div>
            
            <div className="card">
                <div className="card-body p-3">
                    
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
                        layout={{width: '100%', height: 480, title: 'A Fancy Plot'}}
                      />
                </div>
            </div>
        </div>
        );
    }
}

export default connect()(Reports);