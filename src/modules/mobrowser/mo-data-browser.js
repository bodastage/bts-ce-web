import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './mo-browser.css';
import $ from 'jquery';
import { getMOFields } from './mobrowser-actions';
import { AgGridReact } from 'ag-grid-react';
import { getQueryForAGGridSortAndFilter } from '../../utils/aggrid-to-jqdt-queries';
import axios, { ERROR_CODES } from '../../api/config';

class MODataBrowser extends React.Component{
    static icon = "puzzle-piece";
    static label = "";
    constructor(props){
        super(props);
        
        this.columnDefs = []
        
        this.state = {
            columnDefs: [],
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
    
    componentDidMount() {
        this.props.dispatch(getMOFields(this.props.options.moId));
    }
    
    
    updateColumnDefs(){
        this.columnDef = [];
        if( typeof this.props.fields === 'undefined'  ) return;
        for(var key in this.props.fields){
            let columnName = this.props.fields[key]
            if( columnName.toUpperCase() === 'FILENAME' || 
                columnName.toUpperCase() === 'VARDATETIME' || columnName === 'pk') continue;
            this.columnDef.push(
                {headerName: columnName, field: columnName,  filter: "agTextColumnFilter"},);
        }
    }
    
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        let _columnApi =  params.columnApi;
        let token = this.props.token;
        let _fields = this.props.fields;
        let _dispatch = this.props.dispatch;
        let moId = this.props.options.moId;

        let dataSource = {  
            rowCount: null,
            getRows: function(params) {
                let page = params.startRow;
                let length= params.endRow - params.startRow;
                let apiEndPoint = "/api/managedobjects/dt/" + moId + "?start="+  page + "&length=" + length;;
                 
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
                    //_dispatch(notifyNodesRequestFailure(entity, "Failed to fetch data"));
                });
            }
        };
        this.gridApi.setDatasource(dataSource);
    }
    render(){
        this.updateColumnDefs();
        return (
            <div>
            <h3><FontAwesomeIcon icon={MODataBrowser.icon}/> {this.props.options.title}</h3>        
                <div className="card">
                    <div className="card-body p-3">

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


function mapStateToProps(state, ownProps){
    
    if ( typeof state.mobrowser.modata[ownProps.options.moId] === 'undefined'){
        return {
            requesting: false,
            requestError:  null,
            token: state.session.userDetails.token,
            fields: []
        };
    }
    
    console.log("state.mobrowser.modata:", state.mobrowser.modata[ownProps.options.moId]);
    return {
            requesting: state.mobrowser.modata[ownProps.options.moId].requesting,
            requestError:  state.mobrowser.modata[ownProps.options.moId].requestError,
            token: state.session.userDetails.token,
            fields: state.mobrowser.modata[ownProps.options.moId].fields
    };
}

export default connect(mapStateToProps)(MODataBrowser);