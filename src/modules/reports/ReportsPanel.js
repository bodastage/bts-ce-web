import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ReportsPanel extends React.Component{
    static icon = "chart-area";
    static label = "Reports";
    constructor(props){
        super(props);
    }

    
    render(){
        return (
        <div>
            <h6><FontAwesomeIcon icon={ReportsPanel.icon}/> Reports</h6>

                <div>
                <input type="text" className="form-control form-control-sm" placeholder="Search reports" aria-label="Search" aria-describedby="basic-addon1"/>
                    
                </div>
        </div>
        );
    }
}

export default connect()(ReportsPanel);