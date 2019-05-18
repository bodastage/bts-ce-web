import React from 'react';
import { connect } from 'react-redux';
import Plot from 'react-plotly.js';
import { getGraphData } from './reports-actions';
import { SizeMe } from 'react-sizeme'

class GraphReport extends React.Component{
    static icon = "table";
    static label = "";
    
    constructor(props){
        super(props);
        
        this.state = {
            width: window.innerWidth - 500
        }
        
        this.updatePlotData.bind(this)

        //Plot data and options/settings
        this.plotData = []

    }       
    
    componentDidMount(){
        this.props.dispatch(getGraphData(this.props.options.reportId));
    }
    
    /**
     * Update plot data with the values from the query and any new options
     * 
     * @param {type} newOptions
     * @returns
     */
    updatePlotData(newOptions){
        //Remove empty slots
        newOptions = newOptions.filter((v) => v!==undefined )
        for(let i in newOptions){
            
            if( newOptions[i].type === 'bar'){
                let xField = newOptions[i].xField;
                let yField = newOptions[i].yField;
                newOptions[i].x = this.props.reportData.data.map((entry, idx) => entry[xField]);
                newOptions[i].y = this.props.reportData.data.map((entry, idx) => entry[yField]);
                newOptions[i].name = yField;
            }

            if( newOptions[i].type === 'scatter'){
                let xField = newOptions[i].xField;
                let yField = newOptions[i].yField;
                newOptions[i].x = this.props.reportData.data.map((entry, idx) => entry[xField]);
                newOptions[i].y = this.props.reportData.data.map((entry, idx) => entry[yField]);
                newOptions[i].name = yField;
            }
            
            if( newOptions[i].type === 'pie'){
                let labelsField = newOptions[i].labelsField;
                let valuesField = newOptions[i].valuesField;
                newOptions[i].labels = this.props.reportData.data.map((entry, idx) => entry[labelsField]);
                newOptions[i].values = this.props.reportData.data.map((entry, idx) => entry[valuesField]);
            }
        }
        
        return  newOptions;
    }
    
    render(){
        let plotTitle = 'Loading...'
        if(this.props.reportInfo !== null){
            let plotOptions = JSON.parse(this.props.reportInfo.options)
            this.plotData = this.updatePlotData(plotOptions.data)   
            plotTitle = this.props.reportInfo.name
        }
        
        console.log("this.plotData:", this.plotData)
        
        return (
        <div style={{width:"100%"}}>
            <SizeMe>
                {({ size }) => <Plot
                    data={this.plotData}
                    layout={{width: this.state.width, height: null, autosize: false, title: plotTitle}}
                    config={{displaylogo:false}}
                    responsive={true}
                />}

            </SizeMe>
        </div>)
        ;
    }
}

function mapStateToProps(state, ownProps){
    
    if ( typeof state.reports.reportsdata[ownProps.options.reportId] === 'undefined'){
        return {
            reportInfo: null,
            data: []
        };
    }
    
    return {
        reportInfo: state.reports.reportsInfo[ownProps.options.reportId],
        reportData: state.reports.reportsdata[ownProps.options.reportId]
    };
}

export default connect(mapStateToProps)(GraphReport);