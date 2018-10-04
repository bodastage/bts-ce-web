import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { addTab } from '../layout/uilayout-actions';

class CMSettingsOptions extends React.Component {
    constructor(props){
        super(props);
        
        this.addTab = this.addTab.bind(this);

    }
    
    addTab = (options) => (e) => { 
        e.preventDefault();

        let tabId = options.component;
        this.props.dispatch(addTab(tabId, options.component, {title: options.title}));
    }
    
    render(){
        return (
            <div>
                <h6><FontAwesomeIcon icon="cog"/> Configuration management</h6>
                
                <a className="dropdown-item" 
                    href="#" 
                    title="Vendor NMS Connection details"
                    onClick={this.addTab({
                                component: 'NMSConnectionDetails',
                                title: 'NMS Connection Details'
                                })}
                > <FontAwesomeIcon icon="link"/>  NMS Connection details</a>
                
                <a className="dropdown-item" 
                    href="#" 
                    title="CM Schduler"
                    onClick={this.addTab({
                                component: 'CMScheduler',
                                title: 'CM Schduler'
                                })}
                    > <FontAwesomeIcon icon="clock"/>  CM Schduler</a>
                    
                <a className="dropdown-item" 
                    href="#" 
                    title="CM Dump Locations"
                    onClick={this.addTab({
                                component: 'CMDumpLocations',
                                title: 'CM Dump Locations'
                                })}
                    > <FontAwesomeIcon icon="file"/>  Dump locations</a>
                    
            </div>
        )
    }
}

export default connect()(CMSettingsOptions);
