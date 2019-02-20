import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {AgGridReact} from 'ag-grid-react';
import { getBaseline, dismissRequestError } from './networkbaseline-actions';


class NetworkBaseline extends React.Component{
    static icon = "stop-circle";
    static label = "Network Baseline";
    
    constructor(props){
        super(props)
        
        this.loadData = this.loadData.bind(this);
        
        this.dismissError = this.dismissError.bind(this)
        
        this.state = {
                columnDefs: [
                    {headerName: "Managed Object", field: "mo"},
                    {headerName: "Parameter", field: "parameter"}

                ],
                rowData: [
                ]
        }
    }
    
    dismissError(){
        this.props.dispatch(dismissRequestError());
    }
    
    loadData(){
        
    }
    
    render(){
        return (
        <div>
            <h3><FontAwesomeIcon icon={NetworkBaseline.icon}/> Network Baseline</h3>
            
            {this.props.requestingData === false ? "" : 
                <div className="pb-1">
                    <div className="progress">
                      <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: 100 +'%'}}>Loading...</div>
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


                    <div  className="ag-theme-balham" style={{width: '100%'}}>
                        <AgGridReact
                            enableColResize={true}
                            gridAutoHeight={true}
                            columnDefs={this.state.columnDefs}
                            rowData={this.props.data}>
                        </AgGridReact>
                    </div>
                        
                </div>
            </div>
        </div>
        );
    }
    
}

function mapStateToProps(state) {
  return {
    requestingData: state.baseline.requestingData,
    requestError: state.baseline.requestError,
    data: state.baseline.data
  }
}

export default connect(mapStateToProps)(NetworkBaseline);