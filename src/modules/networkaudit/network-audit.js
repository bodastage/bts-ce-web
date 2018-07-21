import React from 'react';
import { connect } from 'react-redux';

class NetworkAudit extends React.Component{
    static icon = "wrench";
    static label = "Network Audit";
    
    constructor(props){
        super(props)
    }
    
    render(){
        return (<div></div>);
    }
    
}

export default connect()(NetworkAudit);