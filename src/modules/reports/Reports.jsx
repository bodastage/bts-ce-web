import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js';
import { setSidePanel } from '../layout/uilayout-actions';
import { ResizeSensor } from "@blueprintjs/core";

class Reports extends React.Component{
    static icon = "chart-area";
    static label = "Reports";
    constructor(props){
        super(props);
        this.setSidePanel = this.setSidePanel.bind(this);
        
        this.updataRowData = this.updataRowData.bind(this)
        this.handleResize = this.handleResize.bind(this)
        
        this.state = { 
            count: 1,
            width: "100%"}
        
        this.layout = {
            title: 'Availability and Congestion',
            xaxis: {
                autorange: true,
                range: ['2015-02-17', '2017-02-16'],
                rangeselector: {buttons: [
                    {
                      count: 1,
                      label: '1m',
                      step: 'month',
                      stepmode: 'backward'
                    },
                    {
                      count: 6,
                      label: '6m',
                      step: 'month',
                      stepmode: 'backward'
                    },
                    {step: 'all'}
                  ]},
                rangeslider: {range: ['2015-02-17', '2017-02-16']},
                type: 'date'
            },
            yaxis: {
              autorange: true,
              range: [86.8700008333, 138.870004167],
              type: 'linear'
            }
        };
        
        this.data = [];
        
    }
    
    updataRowData(err, rows){
        function unpack(rows, key) {
          return rows.map(function(row) { return row[key]; });
        }


        var trace1 = {
          name: "Availability",
          type: "scatter",
          mode: "lines",
          x: unpack(rows, 'Date'),
          y: unpack(rows, 'AAPL.High'),
          line: {color: '#17BECF'}
        }

        var trace2 = {
            name: "Congestion",
          type: "scatter",
          mode: "lines",
          x: unpack(rows, 'Date'),
          y: unpack(rows, 'AAPL.Low'),
          line: {color: '#7F7F7F'}
        }

        this.data = [trace1,trace2];
        
        this.setState({count: 2})

    }
    
    componentDidMount(){
        Plotly.d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv", this.updataRowData)
    }
    
    setSidePanel(){
        this.props.dispatch(setSidePanel('ReportsPanel'));
    }
    
    handleResize(resizeEntries){
        this.setState({width: resizeEntries[0].contentRect.width + "px"})
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
                <ResizeSensor onResize={this.handleResize}>
                <Plot
                        data={this.data}
                        
                        useResizeHandler={true} 
                        layout={this.layout} 
                        style={{width: this.state.width, height: height+"px"}}
                      /> 
                </ResizeSensor>
                </div>
            </div>
        </div>
        );
    }
}

export default connect()(Reports);