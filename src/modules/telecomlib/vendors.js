import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import {AgGridReact} from 'ag-grid-react';
import axios from 'axios';

class Vendors extends React.Component{
    static icon = "university";
    static label = "Vendors";
    
    
    constructor(props){
        super(props)

        this.state = {
                isLoading: true,
                columnDefs: [
                    {headerName: "Name", field: "name"},
                    {headerName: "Description", field: "description"}

                ],
                rowData: [
                    {name: "Ericsson", description: "Ericsson AB"},
                    {name: "Huawei", description: "Huawei Solutions"},
                    {name: "ZTE", description: "ZTE Corporation"},
                    {name: "Nokia", description: "Nokia Solutions"}
                ]
        }
    }
    
    
    componentDidMount() {
        this.setState({ isLoading: true });
        
    }
    
    render(){
        return (
        <div>
            <h3><FontAwesomeIcon icon={Vendors.icon}/> Vendors</h3>
            
            {this.state.isLoading === false ? "" : 
                <div className="pb-1">
                    <div className="progress">
                      <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: 100 +'%'}}>Loading...</div>
                    </div>
                </div>
            }
            
            <div className="card">
                <div className="card-body p-3">
                
                    <div
                        className="ag-theme-balham"
                        style={{
                                width: '100%'
                        }}
                    >
                        <AgGridReact
                                gridAutoHeight={true}
                                columnDefs={this.state.columnDefs}
                                rowData={this.state.rowData}>
                        </AgGridReact>
                    </div>
                        
                </div>
            </div>
        </div>
        );
    }
}  
    
export default connect()(Vendors);