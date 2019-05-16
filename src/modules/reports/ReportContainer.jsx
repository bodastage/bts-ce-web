import React from 'react';
import { connect } from 'react-redux';
import { Intent, Spinner } from "@blueprintjs/core";
import { getReportInfo } from './reports-actions';
import TableReport from './TableReport';
import GraphReport from './GraphReport';

/**
 * This component display the reports
 * 
 */
class ReportContainer extends React.Component{
    static icon = "table";
    static label = "";
    
    constructor(props){
        super(props);
    }
    
    componentDidMount() {
        
        //If there are no fields then there is no info about the report downloaded yet
        if(this.props.reportInfo === null ){
            this.props.dispatch(getReportInfo(this.props.options.reportId));
        }  
    }
    
    render(){
        
        //Show spinner as we wait for data
        if( this.props.reportInfo === null ){
            return <Spinner size={Spinner.SIZE_LARGE} className="mt-5"/>
        }
        
        //Show table tabular data
        //If options are null, {},
        if( this.props.reportInfo.options === null || 
                Object.keys(this.props.reportInfo.options).length === 0
        ){
            return <TableReport options={this.props.options}/>
        }
        
        return <GraphReport options={this.props.options}/>
        //return <div>Report container</div>;
    }
}

function mapStateToProps(state, ownProps){
    
    if ( typeof state.reports.reportsInfo[ownProps.options.reportId] === 'undefined'){
        return {
            reportInfo: null,
        };
    }
    
    return {
            reportInfo: state.reports.reportsInfo[ownProps.options.reportId]
    };
}

export default connect(mapStateToProps)(ReportContainer);