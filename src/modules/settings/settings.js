import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setSidePanel } from '../layout/uilayout-actions';

class Settings extends React.Component{
    static icon = "cog";
    static label = "Settings";
    constructor(props){
        super(props);
        
        this.showCMLeftPanel = this.showCMLeftPanel.bind(this);
    }
    
    showCMLeftPanel(){
         this.props.dispatch(setSidePanel('CMSettingsOptions'));
    }
    
    render(){
        return (
            <div>
                <h3><FontAwesomeIcon icon="cog"/> Settings</h3>
                <div className="card">
                    <div className="card-body p-3">
                        <a href="#" className="launch-cm-menu" onClick={this.showCMLeftPanel}><FontAwesomeIcon icon="arrow-right"/> Configuration management</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(Settings);