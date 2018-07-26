import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MOBrowser extends React.Component{
    static icon = "puzzle-piece";
    static label = "MO Browser";
    
    constructor(props){
        super(props)
    }
    
    render(){
        return (
                
        <div>
            <h3><FontAwesomeIcon icon={MOBrowser.icon}/> MO Browser</h3>

            <div className="card  mb-2">
                <div className="card-body p-3">
                    <a href="#" className="launch-network-tree"><FontAwesomeIcon icon="arrow-right"/> Launch MO Browser</a>        
                </div>
            </div>
        </div>
        );
    }
    
}

export default connect()(MOBrowser);