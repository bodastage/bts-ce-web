import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

export default class Loading extends React.Component {
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
    }
    
    componentWillReceiveProps(nextProps){
    }
    
    render(){
        if (this.props.show === true) {
            return (
                <div className="login-logo">
                    <FontAwesomeIcon icon="spinner" spin size="lg"/>
                </div>
            );
        }
        
        return (<div></div>);
    }
}