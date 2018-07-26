import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API_URL } from '../../api/config';

export default class Airflow extends React.Component{
    static icon = "cogs";
    static label = "Airflow";
    
    constructor(props){
        super(props);
    }

    
    render(){
        return (
                
        <div>
            <div className="airflow-container">
                <iframe src={API_URL + ":8080"} width="500" height="500" frameBorder="0" className="airflow-frame">Browser not compatible.</iframe>    
            </div>
        </div>
        

        );
    }
    
}
