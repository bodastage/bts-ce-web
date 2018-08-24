import React from 'react';
import { API_URL } from '../../api/config';

export default class RabbitMQ extends React.Component{
    static icon = "cogs";
    static label = "RabbitMQ";
    
    render(){
        return (
                
        <div>
            <div className="airflow-container">
                <iframe title="Rabbit MQ" src={API_URL + ":15672"} width="500" height="500" frameBorder="0" className="airflow-frame">Browser not compatible.</iframe>    
            </div>
        </div>
        

        );
    }
    
}
