import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Help extends React.Component {
        
     static icon = "question-circle";
     static label = "Help"
        
    render(){
        return (
            <div>
                <h3><FontAwesomeIcon icon="question-circle"/> Help</h3>

                <div className="card">
                
                  <div className="card-body">
                    <h4 className="card-title">About</h4>
                    <p className="card-text"> 
                        Send support query to support@bodastage.com
                    </p>

                  </div>
                </div>
            </div>    
        );
    }
}