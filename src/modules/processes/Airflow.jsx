import React from 'react';
import { HOST_URL } from '../../api/config';

export default class Airflow extends React.Component{
    static icon = "cogs";
    static label = "Airflow";
    
    render(){
        return (
                
        <div>
            <div className="airflow-container">
                <iframe src={HOST_URL + ":8080"} width="500" height="500" frameBorder="0" className="airflow-frame">Browser not compatible.</iframe>    
            </div>
        </div>
        

        );
    }
    
}
