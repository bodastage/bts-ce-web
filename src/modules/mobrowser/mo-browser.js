import React from 'react';
import { connect } from 'react-redux';

class MOBrowser extends React.Component{
    static icon = "puzzle-piece";
    static label = "MO Browser";
    
    constructor(props){
        super(props)
    }
    
    render(){
        return (<div></div>);
    }
    
}

export default connect()(MOBrowser);