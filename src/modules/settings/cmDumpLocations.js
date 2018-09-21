import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setSidePanel } from '../layout/uilayout-actions';

class CMDumpLocations extends React.Component{
    static icon = "file";
    static label = "CM Dump Locations";
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <div>
                <h3><FontAwesomeIcon icon="file"/> CM Dump Locations</h3>
                <div className="card">
                    <div className="card-body p-3">
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(CMDumpLocations);