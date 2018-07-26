import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $ from 'jquery';
import './processes.css';
import { addTab } from '../layout/uilayout-actions';

class Processes extends React.Component{
    static icon = "cogs";
    static label = "Processes";
    
    constructor(props){
        super(props);
    }
    
    addTab = (name) => (e) => { 
        e.preventDefault();
        
        this.props.dispatch(addTab(name, name, {title:name}));
        
        $('#myTab li #'+this.props.activeTab+"-tab").tab('show');
    }
    
    render(){
        return (
                
        <div>
            <h3><FontAwesomeIcon icon={Processes.icon}/> Processes</h3>

            <div className="card">
                <div className="card-body p-3">
                    <div className="row">
                        <div className="col-md-6"><a href="#" className="launch-airflow" onClick={this.addTab('Airflow')}><FontAwesomeIcon icon="arrow-right"/> Airflow</a></div>
                        <div className="col-md-6"><a href="#" className="launch-rabbitmq" onClick={this.addTab('RabbitMQ')}><FontAwesomeIcon icon="arrow-right"/> RabbitMQ</a></div>
                    </div>
                </div>
            </div>
        </div>
        

        );
    }
    
}

export default connect()(Processes);