import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dashboard from '../dashboard/dashboard';
import Help from '../help/help.js';

const Components = {
    "Help": Help,
    "Dashboard": Dashboard};

class Tabs extends React.Component {
    constructor(props){
        super(props);
        
        this.closeTab = this.closeTab.bind(this);
    }
    
    loadModule(event){
        event.preventDefault();
    }
    
    addTab(){

    }
    
    closeTab = (name) => (e) => { 
        e.stopPropagation();
        e.preventDefault();
        
        this.props.dispatch({
            type: 'CLOSE_TAB',
            tab: name
        });
    }
    
    render(){
        let tabTitles = this.props.tabs.map( tab => {
                const Tag = Components[tab];
                const activeClass = tab === this.props.activeTab ? 'active show': ""; 
                return (
                <React.Fragment key={tab}>
                    <li className="nav-item" key={tab}>
                        <a className={"nav-link " + activeClass} id={tab+"-tab"} data-toggle="tab" href={"#"+tab} role="tab" aria-controls={tab} aria-selected="false">
                        <FontAwesomeIcon icon={Tag.icon}/> {Tag.label} &nbsp;
                        <button type="button" className="close" aria-label="Close" onClick={this.closeTab(tab)}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                        </a>
                    </li>
                </React.Fragment>    
            );   
        });
        
        let tabContents = this.props.tabs.map( tab => {
            const Tag = Components[tab];
            const activeClass = tab === this.props.activeTab ? 'active show': ""; 
            return (
                <React.Fragment key={tab}>
                    <div className={"tab-pane fade " + activeClass} id={tab} role="tabpanel" aria-labelledby="contact-tab"><Tag/></div>
                </React.Fragment>
            );
        });
        
        return (
            <div>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  {tabTitles}
                </ul>
                
                <div className="tab-content" id="myTabContent">
                    {tabContents}
                </div>      
            </div>
        );
    }
}

export default connect()(Tabs);