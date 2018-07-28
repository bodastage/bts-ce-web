import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $ from 'jquery';
import {AgGridReact} from 'ag-grid-react';
import { getEntities, dismissRequestError } from './network-browser-actions';

class ElementBrowser extends React.Component{
    static icon = "sitemap";
    static label = "Element Browser";
    
    constructor(props){
        super(props);

        this.dismissError = this.dismissError.bind(this);
        this.updateColumnDefs = this.updateColumnDefs.bind(this);
        this.refreshData = this.refreshData.bind(this);
        
        this.columnDefs = []
        
        this.state = {
            columnDefs: [
                {headerName: "Name", field: "nodename",  filter: "agTextColumnFilter"},
                {headerName: "Node", field: "node",  filter: "agTextColumnFilter"},
                {headerName: "Name", field: "name",  filter: "agTextColumnFilter"},
                {headerName: "Type", field: "type",  filter: "agTextColumnFilter"},
                {headerName: "Technology", field: "technology",  filter: "agTextColumnFilter"},
                {headerName: "Vendor", field: "vendor",  filter: "agTextColumnFilter"}

            ],
            rowData: [
            ]
        };
    }
    
    refreshData(){
        this.props.dispatch(getEntities(this.props.options.entity));
    }
    
    downloadData(){
        
    }
    
    updateColumnDefs(){
        this.columnDef = [];
        if( typeof this.props.data.data === 'undefined'  ) return;
        for(var key in this.props.data.data[0]){
            if( key === 'id' || key === 'date_added' || key === 'pk') continue;
            this.columnDef.push(
                {headerName: key.toUpperCase(), field: key,  filter: "agTextColumnFilter"},);
        }
    }
    
    
    dismissError(){
        this.props.dispatch(dismissRequestError(this.props.options.entity));
    }
    
    componentDidMount() {
        this.props.dispatch(getEntities(this.props.options.entity));
    }
    
    componentWillMount() {
        console.log("ElementBrowser.componentDidMount");
    }

    
    render(){
        this.updateColumnDefs();

        return (
        <div>
            <h3><FontAwesomeIcon icon={ElementBrowser.icon}/> {this.props.options.title}</h3>
            
            {this.props.requesting === false ? "" : 
                <div className="pb-1">
                    <div className="progress">
                      <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: 100 +'%'}}>Processing...</div>
                    </div>
                </div>
            }
            
            {this.props.requestError === null ? "" :
                    <div className="alert alert-danger" role="alert">
                        {this.props.requestError}
                        <button type="button" className="close"  aria-label="Close" onClick={this.dismissError}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
            }
            
            <div className="card">
                <div className="card-body p-3">
                
                <div className="mb-2">
                    <a href="#" title="Refresh" onClick={this.refreshData} className="mr-2"><FontAwesomeIcon icon="sync"/></a>
                    <a href="#" title="Download" onClick={this.downloadData}><FontAwesomeIcon icon="download"/></a>
                    
                </div>
                
                    <div className="ag-theme-balham" style={{width: '100%'}}>
                        <AgGridReact
                            enableColResize={true}
                            gridAutoHeight={true}
                            columnDefs={this.columnDef}
                            enableFilter={true}
                            enableSorting={true}
                            pagination={true}
                            paginationAutoPageSize={true}
                            paginationPageSize={20}
                            rowData={this.props.data.data}>
                        </AgGridReact>
                    </div>
                        
                </div>
            </div>
        </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    if ( typeof state.networkbrowser[ownProps.options.entity] === 'undefined'){
        return {
            requesting: false,
            requestError:  null,
            data: {}
        };
    }
    
  return {
    requesting: state.networkbrowser[ownProps.options.entity].requesting,
    requestError: state.networkbrowser[ownProps.options.entity].requestError,
    data: state.networkbrowser[ownProps.options.entity].data
  };
}

export default connect(mapStateToProps)(ElementBrowser);