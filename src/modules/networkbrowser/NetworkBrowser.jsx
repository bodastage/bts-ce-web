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
            
            <div className="card">
                <div className="card-body p-3">
                    <div className="row mb-3">
                        <div className="col-md-4"><a href="#" className="show-node-list" onClick={this.launchEntityTab({entity:'node', title: 'Network Nodes'})}><FontAwesomeIcon icon="arrow-right"/> View all nodes</a></div>
                        <div className="col-md-4"><a href="#" className="show-site-list" onClick={this.launchEntityTab({entity:'site', title: 'Network Sites'})}><FontAwesomeIcon icon="arrow-right"/> View all sites</a></div>
                        <div className="col-md-4"><a href="#" className="show-nbr-list" onClick={this.launchEntityTab({entity:'relation', title: 'Network Relations'})}><FontAwesomeIcon icon="arrow-right"/> View all relations</a></div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-4"><a href="#" className="show-2gcell-list" onClick={this.launchEntityTab({entity:'gsm_cell_params', title: '2G Cell Parameters'})}><FontAwesomeIcon icon="arrow-right"/> View 2G cell parameters</a></div>
                        <div className="col-md-4"><a href="#" className="show-3gcell-list" onClick={this.launchEntityTab({entity:'umts_cell_params', title: '3G Cell Parameters'})}><FontAwesomeIcon icon="arrow-right"/> View 3G cell parameters</a></div>
                        <div className="col-md-4"><a href="#" className="show-4gcell-list" onClick={this.launchEntityTab({entity:'lte_cell_params', title: '4G Cell Parameters'})}><FontAwesomeIcon icon="arrow-right"/> View 4G cell parameters</a></div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-4"><a href="#" className="load-2g-externals" onClick={this.launchEntityTab({entity:'gsm_externals', title: '2G External Cells'})}><FontAwesomeIcon icon="arrow-right"/> View 2G externals</a></div>
                        <div className="col-md-4"><a href="#" className="load-3g-externals" onClick={this.launchEntityTab({entity:'umts_externals', title: '3G External Cells'})}><FontAwesomeIcon icon="arrow-right"/> View 3G externals</a></div>
                        <div className="col-md-4"><a href="#" className="load-msc-definitions"><FontAwesomeIcon icon="arrow-right"/> View MSC definitions</a></div>
                    </div>
                    
                </div>
            </div>
            
        </div>
        );
    }
}

export default connect()(NetworkBrowser)