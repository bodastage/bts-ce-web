import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class NetworkAudit extends React.Component{
    static icon = "wrench";
    static label = "Network Audit";
    
    constructor(props){
        super(props)
    }
    
    render(){
        return (
                
        <div>
            <h3><FontAwesomeIcon icon={NetworkAudit.icon}/> Network Audit</h3>

            <div className="card  mb-2">
                <div className="card-body p-3">
                    <a href="#" className="launch-network-tree"><FontAwesomeIcon icon="arrow-right"/> Launch audit rules</a>        
                </div>
            </div>
        </div>
        );
    }
    
}

export default connect()(NetworkAudit);