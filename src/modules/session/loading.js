import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

export default class Loading extends React.Component {
    constructor(props){
        super(props);
        
        console.log("props:" + props);
    }
    
    componentDidMount(){
        console.log(this.props)
    }
    
    componentWillReceiveProps(nextProps){
        console.log("nextProps:" + nextProps);
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