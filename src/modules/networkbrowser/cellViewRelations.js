import React from 'react';
import { connect } from 'react-redux';
import {AgGridReact} from 'ag-grid-react';

class CellViewRelations extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            columnDefs: [
                
                {headerName: "SVRCELL", field: "svrcell",  filter: "agTextColumnFilter"},
                {headerName: "NBRCELL", field: "nbrcell",  filter: "agTextColumnFilter"},
                {headerName: "SVRVENDOR", field: "svrvendor",  filter: "agTextColumnFilter"},
                {headerName: "NBRVENDOR", field: "nbrvendor",  filter: "agTextColumnFilter"}
            ],
            rowData: [
            ]
        }
        
        this.rowData = []
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
                        rowData={this.props.relations}>
                    </AgGridReact>
                </div>             
        </div>)
    }
}

function mapStateToProps(state, ownProps) {
    if (typeof state.networkbrowser.cells[ownProps.cellId] === 'undefined'){
        return {
            relations: []
        };
    }
    
  return {
    relations: state.networkbrowser.cells[ownProps.cellId]["relations"]
  };
}

export default connect(mapStateToProps)(CellViewRelations);