import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setSidePanel } from '../layout/uilayout-actions';

class CMScheduler extends React.Component{
    static icon = "clock";
    static label = "CM Scheduler";
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <div>
                <h3><FontAwesomeIcon icon="clock"/> CM Scheduler</h3>
                <div className="card">
                    <div className="card-body p-3">
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(CMScheduler);