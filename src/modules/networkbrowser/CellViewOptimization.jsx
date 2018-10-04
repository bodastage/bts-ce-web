import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class CellViewOptimization extends React.Component{
    constructor(props){
        super(props);

    }
    
    render(){
        return (<div>
            <ul>
                <li>Throughput</li>
                <li>Congestion</li>
            </ul>
        </div>)
    }
}

export default connect()(CellViewOptimization);