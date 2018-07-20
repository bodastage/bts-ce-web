import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class SidePanel extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return (
        <div class="">
                <span className="dropdown-item-text legend w-100">Radio Access Network</span>
                <a className="dropdown-item" href="#/netmgt"> <FontAwesomeIcon icon="sitemap" /> Network Browser</a>
                <a className="dropdown-item" href="#/netaudit" ><FontAwesomeIcon icon="wrench"/> Network Audit</a>
                <a className="dropdown-item" href="#/mobrowser" ><FontAwesomeIcon icon="puzzle-piece"/> MO Browser</a>
                <a className="dropdown-item" href="#/baseline"> <FontAwesomeIcon icon="stop-circle"/>  Baseline Values</a>
                <a className="dropdown-item" href="#/telecomlib"> <FontAwesomeIcon icon="university"/>  Telecom Library</a>
                <span className="dropdown-item-text legend w-100">System</span>
                <a className="dropdown-item" href="#"> <FontAwesomeIcon icon="cogs"/>  Processes</a>
                <a className="dropdown-item" href="#"><FontAwesomeIcon icon="cog"/> Settings</a>
                <a className="dropdown-item" href="#"><FontAwesomeIcon icon="user"/> Profile</a>
                <a className="dropdown-item" href="#"><FontAwesomeIcon icon="question-circle"/>  Help</a>
        </div>
        );
        
    }
    
}