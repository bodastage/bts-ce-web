import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $ from 'jquery';
import {AgGridReact} from 'ag-grid-react';
import { getEntities, dismissRequestError } from './network-browser-actions';

class ElementBrowser extends React.Component{
    static icon = "sitemap";
    static label = "Element Browser";
    
    constructor(props){
        super(props);

        this.dismissError = this.dismissError.bind(this);
        
        this.state = {
            columnDefs: [
                {headerName: "Name", field: "nodename",  filter: "agTextColumnFilter"},
                {headerName: "Type", field: "type",  filter: "agTextColumnFilter"},
                {headerName: "Technology", field: "technology",  filter: "agTextColumnFilter"},
                {headerName: "Vendor", field: "vendor",  filter: "agTextColumnFilter"}

            ],
            rowData: [
            ]
        };
    }
    
    
    dismissError(){
        this.props.dispatch(dismissRequestError(this.props.options.entity));
    }
    
    componentDidMount() {
        this.props.dispatch(getEntities(this.props.options.entity));
    }
    
    componentDidUpdate(){

    }
    
    render(){
        return (
        <div>
            <h3><FontAwesomeIcon icon={ElementBrowser.icon}/> {this.props.options.title}</h3>
            
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
                            enableFilter={true}
                            enableSorting={true}
                            rowData={this.props.data.data}>
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
            data: [] 
        };
    }
    
  return {
    requesting: state.networkbrowser[ownProps.options.entity].requesting,
    requestError: state.networkbrowser[ownProps.options.entity].requestError,
    data: state.networkbrowser[ownProps.options.entity].data
  };
}

export default connect(mapStateToProps)(ElementBrowser);