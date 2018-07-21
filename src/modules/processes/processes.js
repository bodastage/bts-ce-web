import React from 'react';
import { connect } from 'react-redux';

class Processes extends React.Component{
    static icon = "cogs";
    static label = "Processes";
    
    constructor(props){
        super(props);
    }
    
    render(){
        return (<div></div>);
    }
    
}

export default connect()(Processes);