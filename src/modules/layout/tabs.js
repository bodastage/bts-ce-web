import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dashboard from '../dashboard/dashboard';

class Modules extends React.Component {
    constructor(props){
        super(props);
        
        console.log("Modules");
        console.log(props);
    }
    
    loadModule(event){
        event.preventDefault();
    }
    
    addTab(title, componentName){

    }
    
    render(){
        let tabs = this.props.tabs.map(function(){
            return (
                <li className="nav-item">
                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
                </li>     
                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
            )
        });
        
        return (
            <div>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                
                {
                    
                  
                  <li className="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
                        <FontAwesomeIcon icon="home"/> Dashboard
                    
                        <button type="button" className="close" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                    </a>
                  </li>
                  }
                          
                  <li className="nav-item">
                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact</a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <Dashboard />
                    </div>
                      <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
                      <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
                </div>      
            </div>
        );
    }
}

export default connect()(Modules);