import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addTab } from '../layout/uilayout-actions';
import { setSidePanel } from '../layout/uilayout-actions';

class NetworkBrowser extends React.Component{
    static icon = "sitemap";
    static label = "Network Browser";
    
    constructor(props){
        super(props);
        
        this.showNetworkTree = this.showNetworkTree.bind(this)
    }
    
    launchEntityTab = (options) => (e) => { 
        e.preventDefault();
        
        let tabId = options.entity + "Tab";
        this.props.dispatch(addTab(tabId, 'ElementBrowser', {
            entity: options.entity,
            title: options.title,
            endpoint: '/api/network/live/' + options.endpoit
        }));
    }
    
    showNetworkTree(){
        this.props.dispatch(setSidePanel('NetworkTree'));
    }
    
    render(){
        return (
                
        <div>
            <h3><FontAwesomeIcon icon={NetworkBrowser.icon}/> Network Browser</h3>

            <div className="card  mb-2">
                <div className="card-body p-3">
                    <a href="#" className="launch-network-tree" onClick={this.showNetworkTree}><FontAwesomeIcon icon="arrow-right"/> View network tree</a>        
                </div>
            </div>
        </div>
        );
    }
}

export default connect()(NetworkBrowser)