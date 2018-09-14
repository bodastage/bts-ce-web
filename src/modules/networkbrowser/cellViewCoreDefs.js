import React from 'react';
import { connect } from 'react-redux';
import {AgGridReact} from 'ag-grid-react';

class CellViewCoreDefinitions extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            columnDefs: [
                
                {headerName: "NODENAME", field: "nodename",  filter: "agTextColumnFilter"},
                {headerName: "CELLNAME", field: "cellname",  filter: "agTextColumnFilter"},
                {headerName: "CGI", field: "cgi",  filter: "agTextColumnFilter"}
            ],
            rowData: []
        }
    }
    
    render(){
        return (<div>
                    <div
                    className="ag-theme-balham "
                    style={{width: '100%'}}
                >
                    <AgGridReact
                        enableColResize={true}
                        gridAutoHeight={true}
                        columnDefs={this.state.columnDefs}
                        enableFilter={true}
                        enableSorting={true}
                        rowData={this.props.core_defs}>
                    </AgGridReact>
                </div>             
        </div>)
    }
}

function mapStateToProps(state, ownProps) {
    if (typeof state.networkbrowser.cells[ownProps.cellId] === 'undefined'){
        return {
            core_defs: []
        };
    }
    
    if (typeof state.networkbrowser.cells[ownProps.cellId]["core_defs"] === 'undefined'){
        return {
            core_defs: []
        };
    }
    
  return {
    core_defs: state.networkbrowser.cells[ownProps.cellId]["core_defs"]
  };
}

export default connect(mapStateToProps)(CellViewCoreDefinitions);