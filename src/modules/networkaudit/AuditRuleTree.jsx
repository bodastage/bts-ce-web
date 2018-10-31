import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAuditRules, setAuditRuleFilter } from './netaudit-actions';
import { addTab } from '../layout/uilayout-actions';
import { Classes, Icon, ITreeNode, Tooltip, Tree, FormGroup, InputGroup } from "@blueprintjs/core";
import './netaudit-panel.css';

class AuditRuleTree extends React.Component{
    static icon = "wrench";
    static label = "Network Audit";
    
    constructor(props){
        super(props)
        
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.dismissError = this.dismissError.bind(this);
        this.showMODataTab = this.showMODataTab.bind(this);
        this.updateNodes = this.updateNodes.bind(this);
        this.onNodeDoubleClick = this.onNodeDoubleClick.bind(this);
        this.handleNodeCollapse = this.handleNodeCollapse.bind(this);

        this.state = {
          text: this.props.filter.text,
          categories: this.props.filter.categories,
          rules: this.props.filter.rules,
          nodesChanges: 0,
          expandedNodes:[]
        };
        
        this.filterRules = this.state.rules;
        this.filterText = this.state.text;
        this.filterCategories = this.state.categories;
        
        this.nodes = [];
    }
    
    handleChangeEvent(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
          [name]: value
        });
        
        switch(name){
            case 'text':this.filterText = value;break;
            case 'rules':this.filterRules = value;break;
            case 'categories':this.filterCategories = value;break;
        }
        
        this.updateFilter();
    }
    
    /**
     * Check whether list of rules provided contains atleast one matching the 
     * search string 
     * 
     * @param Array rules Array of rules
     * @param String search Search String
     * @returns {Boolean}
     */
    catContainsMatchingRule(rules, search){
        var regex = new RegExp(search, 'i');
        for(var key in rules){
            if ( regex.test(rules[key].name) ) return true;
        }
        return false;
    }
    
    updateFilter(){
        this.props.dispatch(setAuditRuleFilter(this.state.text, this.filterCategories, this.filterRules));
    }
    
    componentDidMount(){
        this.props.dispatch(getAuditRules());
        
        this.updateNodes();
    }
    
    dismissError(){
        
    }
    
    
    showMODataTab(ruleName, ruleId){ 
        let tabId = 'netaudit_rule_' + ruleId + "Tab";
        this.props.dispatch(addTab(tabId, 'NetAuditRuleData', {
            title: ruleName,
            ruleId: ruleId
        }));
    }
    
    updateNodes(){
        this.nodes = [];
        
        const filterText = this.state.text;
        const filterOnrules = this.state.rules;
        const filterOnCategories = this.state.categories;
        const noFilter = filterOnrules && filterOnCategories && (filterText === '');
        
        for(let key in this.props.rules){
            let cat = this.props.rules[key];
            
            //Filter categories
            var regex = new RegExp(filterText, 'i');
            if( (filterText !== "" && filterOnCategories && !regex.test(cat.cat_name)) ||
                !this.catContainsMatchingRule(cat.rules, filterText)
              ){ 
                continue;
            }
            
            const isExpanded = this.state.expandedNodes.indexOf(cat.cat_id) !== -1
            const icon = isExpanded === true ? "folder-open": "folder-close"
            let ruleCategory = {
                id: cat.cat_id,
                hasCaret: true,
                icon: icon,
                label: cat.cat_name,
                key: cat.cat_id,
                isExpanded : isExpanded,
                catId: cat.cat_id,
                childNodes: []        
            };
            
            //Get rules under category 
            for (let k in cat.rules){
                let rule = cat.rules[k];
                
                //Filter rules
                if( (filterText !== "" && filterOnrules && !regex.test(rule.name)) ){
                    continue;
                }
                
                ruleCategory['childNodes'].push({
                    id: cat.cat_id + "-" + rule.id,
                    label:rule.name,
                    icon:"wrench",
                    ruleId: rule.id,
                    catId: cat.cat_id
                });
            }
            this.nodes.push(ruleCategory);
        }
    }

    onNodeDoubleClick = (nodeData: ITreeNode) => {

        if(typeof nodeData.ruleId !== 'undefined'){
            this.showMODataTab(nodeData.label, nodeData.ruleId);
        }
    }
    
    handleNodeCollapse = (nodeData: ITreeNode) => {
        const expandedNodes = this.state.expandedNodes.filter((v,k) => v !== nodeData.catId)
        this.setState({expandedNodes: expandedNodes});
    };

    handleNodeExpand = (nodeData: ITreeNode) => {
        
        let expandedNodes = this.state.expandedNodes;
        
        if(this.state.expandedNodes.indexOf(nodeData.catId) === -1 ){
            expandedNodes.push(nodeData.catId)
        }else{
            return true;
        }
        
        this.setState({expandedNodes: expandedNodes});
    };

    
    render(){        
        this.updateNodes();
        
        return (
            
        <div>

          <h6><FontAwesomeIcon icon={AuditRuleTree.icon}/> Network Audit Rules</h6>

                <div>

                <FormGroup
                    label=""
                    labelFor="search_network"
                >
                    <InputGroup 
                        id="search_network" 
                        placeholder="Search audit rules..." 
                        leftIcon="search" 
                        name="text"
                        type="text"
                        value={this.state.text} 
                        onChange={this.handleChangeEvent}
                    />
                </FormGroup>
                
                <div className="mb-2">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1" checked={this.state.categories} name="categories" onChange={this.handleChangeEvent}/>
                        <label className="form-check-label" htmlFor="inlineCheckbox1">Categories</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox2" checked={this.state.rules} name="rules" onChange={this.handleChangeEvent}/>
                        <label className="form-check-label" htmlFor="inlineCheckbox2">Rules</label>
                    </div>
                </div>
        
                {this.props.requestError === null ? '': 
                    <div className="alert alert-danger mt-1 mb-1 p-2" role="alert">
                        {this.props.requestError}
                        <button type="button" className="close"  aria-label="Close" onClick={this.dismissError}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>     
                }

            <Tree 
                contents={this.nodes}
                onNodeDoubleClick={this.onNodeDoubleClick}
                onNodeCollapse={this.handleNodeCollapse}
                onNodeExpand={this.handleNodeExpand}
            />
            </div>
        </div>
        );
    }
    
}
    
function mapStateToProps(state){
    return {
        rules: state.netaudit.rules,
        filter: state.netaudit.filter,
        requestingRules: state.netaudit.requestingRules,
        requestError: state.netaudit.requestError
    };
}

export default connect(mapStateToProps)(AuditRuleTree);