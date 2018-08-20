import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $ from 'jquery';
import {AgGridReact} from 'ag-grid-react';
import { getEntityFields, getEntities, dismissRequestError, notifyNodesRequestFailure } from './network-browser-actions';
import axios, { ERROR_CODES } from '../../api/config';
import { getQueryForAGGridSortAndFilter } from '../../utils/aggrid-to-jqdt-queries';
import { ProgressBar, Intent, ButtonGroup, Button } from "@blueprintjs/core"; 

class ElementBrowser extends React.Component{
    static icon = "sitemap";
    static label = "Element Browser";
    
    constructor(props){
        super(props);

        this.dismissError = this.dismissError.bind(this);
        this.updateColumnDefs = this.updateColumnDefs.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.downloadData = this.downloadData.bind(this);
        
        this.fields = [];
        
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
        console.log("entity:", this.props.options.entity);
    }
    
    updateColumnDefs(){
        this.columnDef = [];
        if( typeof this.props.fields === 'undefined'  ) return;
        for(var key in this.props.fields){
            let columnName = this.props.fields[key]
            if( columnName === 'id' || columnName === 'date_added' || columnName === 'pk') continue;
            this.columnDef.push(
                {headerName: columnName.toUpperCase(), field: columnName,  filter: "agTextColumnFilter"},);
        }
    }
    
    
    dismissError(){
        this.props.dispatch(dismissRequestError(this.props.options.entity));
    }
    
    componentDidMount() {
        this.props.dispatch(getEntityFields(this.props.options.entity));
    }
    
    componentWillMount() {
    }
    
    onGridReady(params) {

        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        let _columnApi =  params.columnApi;
        let token = this.props.token;
        let entity= this.props.options.entity;
        let _fields = this.props.fields;
        let _dispatch = this.props.dispatch;

        let dataSource = {  
            rowCount: null,
            getRows: function(params) {
                
                let page = params.startRow;
                let length= params.endRow - params.startRow;
                let gridColumns = _columnApi.getAllColumns();
                
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
                
                
                let query = getQueryForAGGridSortAndFilter( _fields, 
                        params.sortModel, params.filterModel, _columnApi.getAllColumns());
                apiEndPoint += "&" + query;
                
                axios.get(apiEndPoint,{
                    headers: { "Authorization": token }
                })
                .then(response => {
                    var lastRow = response.data.recordsFiltered;
                    params.successCallback(response.data.data, lastRow);
                })
                .catch(function(error){
                    _dispatch(notifyNodesRequestFailure(entity, "Failed to fetch data"));
                });
            }
        };
        this.gridApi.setDatasource(dataSource);
    }
    
    filterAndSort(filterModel, sortModel){
        
    }
    render(){
        this.updateColumnDefs();
        

        
        return (
        <div>
            <h3><FontAwesomeIcon icon={ElementBrowser.icon}/> {this.props.options.title}</h3>
            
            {this.props.requesting === false ? "" : 
                <div className="pb-1">
                    <ProgressBar intent={Intent.PRIMARY}/>
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
                <div className="card-body p-2">
                
                <div className="mb-1">
                <ButtonGroup minimal={true}>
                    <Button icon="refresh" onClick={this.refreshData}></Button>
                    <Button icon="download" onClick={this.downloadData}></Button>
                </ButtonGroup>
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
            data: {},
            token: state.session.userDetails.token,
            fields: []
        };
    }
    
  return {
    requesting: state.networkbrowser[ownProps.options.entity].requesting,
    requestError: state.networkbrowser[ownProps.options.entity].requestError,
    data: state.networkbrowser[ownProps.options.entity].data,
    token: state.session.userDetails.token,
    fields: state.networkbrowser[ownProps.options.entity].fields,
  };
}

export default connect(mapStateToProps)(ElementBrowser);