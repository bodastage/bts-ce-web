import React from 'react';
import { connect } from 'react-redux';

class TelecomLib extends React.Component{
    static icon = "university";
    static label = "Telecom Library";
    
    constructor(props){
        super(props)
    }
    
    render(){
        return (<div></div>);
    }
    
}

export default connect()(TelecomLib);