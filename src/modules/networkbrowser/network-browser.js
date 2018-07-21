import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class NetworkBrowser extends React.Component{
    static icon = "sitemap";
    static label = "Network Browser";
    constructor(props){
        super(props);
    }
    
    render(){
        return (<div/>);
    }
}

export default connect()(NetworkBrowser);