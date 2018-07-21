import React from 'react';
import { connect } from 'react-redux';

class UserProfile extends React.Component{
    static icon = "user";
    static label = "User Profile";
    
    constructor(props){
        super(props);
    }
    
    render(){
        return (<div></div>);
    }
}

export default connect()(UserProfile);