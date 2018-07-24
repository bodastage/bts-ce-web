import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import {AgGridReact} from 'ag-grid-react';
import axios from 'axios';
import { getTechnologies, dismissRequestError } from './technologies-actions';

class Technologies extends React.Component{
    static icon = "university";
    static label = "Technologies";
    
    
    constructor(props){
        super(props)

        this.dismissError = this.dismissError.bind(this)
        
        this.state = {
                columnDefs: [
                    {headerName: "Name", field: "name"},
                    {headerName: "Description", field: "notes"}

                ],
                rowData: [
                ]
        }
    }
    
    dismissError(){
        this.props.dispatch(dismissRequestError());
    }
    
    componentDidMount() {
        this.props.dispatch(getTechnologies());
    }
    
    componentDidUpdate(){
    }
    
    render(){
        return (
        <div>
            <h3><FontAwesomeIcon icon={Technologies.icon}/> Technologies</h3>
            
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


                    <div
                        className="ag-theme-balham"
                        style={{width: '100%'}}
                    >
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
    requestingData: state.technologies.requestingData,
    requestError: state.technologies.requestError,
    data: state.technologies.data
  }
}

export default connect(mapStateToProps)(Technologies);