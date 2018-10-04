import React from 'react';
import { connect } from 'react-redux';
import {AgGridReact} from 'ag-grid-react';

class CellViewExternalDefinitions extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            columnDefs: [
                
                {headerName: "NODENAME", field: "nodename",  filter: "agTextColumnFilter"},
                {headerName: "CELLNAME", field: "cellname",  filter: "agTextColumnFilter"}
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
                        rowData={this.props.ext_defs}>
                    </AgGridReact>
                </div>             
        </div>)
    }
}

function mapStateToProps(state, ownProps) {
    if (typeof state.networkbrowser.cells[ownProps.cellId] === 'undefined'){
        return {
            ext_defs: []
        };
    }
    
    if (typeof state.networkbrowser.cells[ownProps.cellId]["ext_defs"] === 'undefined'){
        return {
            ext_defs: []
        };
    }
    
  return {
    ext_defs: state.networkbrowser.cells[ownProps.cellId]["ext_defs"]
  };
}

export default connect(mapStateToProps)(CellViewExternalDefinitions);