import React from 'react'
import jQuery from '../../utils/jquery';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import * as DashboardCSS from './dashboard.css';

export default class Help extends React.Component {
        
     static icon = "question-circle";
     static label = "Help"
     
    constructor(props){
        super(props);
    }
        
    render(){
        return (
            <div>
                <div className="bd-notice"></div>
                <h1><FontAwesomeIcon icon="question-circle"/> Help</h1>

                <div className="panel panel-default">
                <div className="panel-heading"><b>About</b></div>
                  <div className="panel-body">
                    <p> 
                        <b>Boda Telecom Suite - CE</b> (BTS-CE) is an open source telecommunication network management platform. The project aims to leverage the best in open source software , big data and machine learning to provide a feature rich platform for network management. It was started at <b><a href="http://www.bodastage.com" target="_blank">Bodastage Solutions</a></b> with initial focus on Radio Network Optimization.
                    </p>

                    <h3>Resources </h3>

                    <ul>
                        <li>Support is provided through the <b><a href="http://www.telecomhall.net"  target="_blank">Telecomhall</a></b> forum.</li>
                        <li>Project home page <b><a href="http://www.bodastage.org"  target="_blank">http://www.bodastage.org</a></b></li>
                        <li>Documentation can be found at <b><a href="http://bts.bodastage.org"  target="_blank">http://bts.bodastage.org</a></b></li>
                        <li>Issues with the application should be logged at the project's <b><a href="https://github.com/bodastage/bts-ce/issues" target="_blank"> github issue tracker</a></b></li>
                    </ul>    


                    <p>
                        For commercial inquiries visit <a href="http://www.bodastage.com" target="_blank">http://www.bodastage.com</a> or send an email to info@bodastage.com.
                    </p>

                  </div>
                </div>
            </div>    
        );
    }
}