import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $ from 'jquery';
import {AgGridReact} from 'ag-grid-react';
import { getEntities, dismissRequestError, notifyNodesRequestFailure } from './network-browser-actions';
import axios, { ERROR_CODES } from '../../api/config';

class ElementBrowser extends React.Component{
    static icon = "sitemap";
    static label = "Element Browser";
    
    constructor(props){
        super(props);

        this.dismissError = this.dismissError.bind(this);
        this.updateColumnDefs = this.updateColumnDefs.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.updateData = this.updateData.bind(this);
        
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
            ],
            rowBuffer: 0,
            rowSelection: "multiple",
            rowModelType: "infinite",
            paginationPageSize: 100,
            cacheOverflowSize: 2,
            maxConcurrentDatasourceRequests: 2,
            infiniteInitialRowCount: 1,
            maxBlocksInCache: 2
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
    }

    updateData(){
        var _lastRow = this.props.data.recordsTotal;
        var _data = this.props.data.data;
        
        let dataSource = {  
            rowCount: null,
            getRows: function(params) {
                console.log("getRows -------------->");
            setTimeout(function() {
                var rowsThisPage = _data.slice(params.startRow, params.endRow);
                var lastRow = _lastRow;
                params.successCallback(rowsThisPage, lastRow);

              }, 500);

            }
        };
        this.gridApi.setDatasource(dataSource);
    }
    
    onGridReady(params) {

        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        //let _data = this.props.data.data || [];
        let _lastRow = this.props.data.recordsTotal;
        let token = this.props.token;
        let entity= this.props.options.entity;
        
        
        console.log("_lastRow:" + _lastRow);
        console.log(this.props);
        
        let dataSource = {  
            rowCount: null,
            getRows: function(params) {
                console.log("params.startRow:" + params.startRow);
                console.log("params.endRow:" + params.endRow);
                
                let page = params.startRow;
                let length= params.endRow - params.startRow;
                
                let apiEndPoint = "/api/network/live/nodes";
                if ( entity === 'node') apiEndPoint = "/api/network/live/nodes?start=" + page + "&length=" + length;
                if ( entity === 'site') apiEndPoint = "/api/network/live/sites?start=" + page + "&length=" + length;
                if ( entity === 'relation') apiEndPoint = "/api/network/live/relations?start=" + page + "&length=" + length;
                if ( entity === 'gsm_cell_params') apiEndPoint = "/api/network/live/cells/gsm?start=" + page + "&length=" + length;
                if ( entity === 'umts_cell_params') apiEndPoint = "/api/network/live/cells/umts?start=" + page + "&length=" + length;
                if ( entity === 'lte_cell_params') apiEndPoint = "/api/network/live/cells/lte?start=" + page + "&length=" + length ;
                if ( entity === 'gsm_externals') apiEndPoint = "/api/network/live/externals/gsm?start=" + page + "&length=" + length;
                if ( entity === 'umts_externals') apiEndPoint = "/api/network/live/externals/umts?start=" + page + "&length=" + length;
                if ( entity === 'lte_externals') apiEndPoint = "/api/network/live/externals/lte?start=" + page + "&length=" + length;

                axios.get(apiEndPoint,{
                    headers: { "Authorization": token }
                })
                .then(response => {
//                    var rowsThisPage = response.data.data.slice(params.startRow, params.endRow);
                    var lastRow = response.data.recordsTotal;
//                    params.successCallback(rowsThisPage, lastRow);
                    params.successCallback(response.data.data, lastRow);
                })
                .catch(function(error){
                    this.props.dispatch(notifyNodesRequestFailure(entity, "Failed to fetch data"));
                });
            }
        };
        this.gridApi.setDatasource(dataSource);
        
        
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
                
                    <div className="ag-theme-balham" style={{width: '100%', height: "100%", boxSizing: "border-box"}}>
                        <AgGridReact
                            pagination={true}
                            gridAutoHeight={true}
                            columnDefs={this.columnDef}
                            components={this.state.components}
                            enableColResize={true}
                            rowBuffer={this.state.rowBuffer}
                            debug={true}
                            rowSelection={this.state.rowSelection}
                            rowDeselection={true}
                            rowModelType={this.state.rowModelType}
                            paginationPageSize={this.state.paginationPageSize}
                            cacheOverflowSize={this.state.cacheOverflowSize}
                            maxConcurrentDatasourceRequests={this.state.maxConcurrentDatasourceRequests}
                            infiniteInitialRowCount={this.state.infiniteInitialRowCount}
                            maxBlocksInCache={this.state.maxBlocksInCache}
                            enableServerSideSorting={true}
                            enableServerSideFilter={true}
                            onGridReady={this.onGridReady.bind(this)}
                            >
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
    data: state.networkbrowser[ownProps.options.entity].data,
    token: state.session.userDetails.token
  };
}

export default connect(mapStateToProps)(ElementBrowser);