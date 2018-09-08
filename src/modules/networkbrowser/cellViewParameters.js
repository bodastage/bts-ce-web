import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import {AgGridReact} from 'ag-grid-react';


class CellViewParameters extends React.Component{
    constructor(props){
        super(props);
        
        this.updateRowData = this.updateRowData.bind(this)
        
        this.state = {
                columnDefs: [
                    {headerName: "Name", field: "name",  filter: "agTextColumnFilter"},
                    {headerName: "Network Value", field: "value",  filter: "agTextColumnFilter"}

                ],
                rowData: [
                ]
        }
        
        this.rowData = []
    }
    
    updateRowData(){
        this.rowData = []
        for(let name in this.props.parameters){
            const value = this.props.parameters[name]
            this.rowData.push({"name":name.toUpperCase(), "value": value })
        }
    }
    
    render(){
        
        this.updateRowData();
        
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
                            rowData={this.rowData}>
                        </AgGridReact>
                    </div>      
        </div>)
    }
}


function mapStateToProps(state, ownProps) {
    if (typeof state.networkbrowser.cells[ownProps.cellId] === 'undefined'){
        return {
            parameters: null
        };
    }
    
  return {
    parameters: state.networkbrowser.cells[ownProps.cellId]["parameters"]
  };
}

export default connect(mapStateToProps)(CellViewParameters);