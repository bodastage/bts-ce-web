import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tree, { TreeNode } from 'rc-tree';
import 'rc-tree/assets/index.css';
import './netaudit-panel.css';
import { getAuditRules, setAuditRuleFilter } from './netaudit-actions';
import FolderIcon from './folder-icon';

class AuditRuleTree extends React.Component{
    static icon = "wrench";
    static label = "Network Audit";
    
    constructor(props){
        super(props)
        
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.dismissError = this.dismissError.bind(this);

        this.state = {
          text: this.props.filter.text,
          categories: this.props.filter.categories,
          rules: this.props.filter.rules
        };
        
        this.filterRules = this.state.rules;
        this.filterText = this.state.text;
        this.filterCategories = this.state.categories;
    }
    
    handleChangeEvent(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log("handleChangeEvent name:", name," value:", value);
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
        console.log("this.state.text:", this.state.text);
        console.log("this.state.rules:", this.state.rules);
        console.log("this.state.categories:", this.state.categories);
        this.props.dispatch(setAuditRuleFilter(this.state.text, this.filterCategories, this.filterRules));
    }
    
    componentDidMount(){
        this.props.dispatch(getAuditRules());
    }
    
    dismissError(){
        
    }
    
    onDoublClick(e){
        console.log("onDoublClick");
    }
    
    render(){
        const filterText = this.state.text;
        const filterOnrules = this.state.rules;
        const filterOnCategories = this.state.categories;
        const noFilter = filterOnrules && filterOnCategories && (filterText === '');
        
        let that = this;
        return (
                
        <div>
            <h6><FontAwesomeIcon icon={AuditRuleTree.icon}/> Network Audit Rules</h6>

                <div>
                <input type="text" name="text" className="form-control form-control-sm" placeholder="Search audit rules" aria-label="Search audit rules" aria-describedby="basic-addon1" value={this.state.text} onChange={this.handleChangeEvent}/>

                <div>
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


                <Tree icon={FolderIcon} defaultExpandAll={filterText !== ''}>
                { this.props.rules
                    .filter(function(v,k){
                        var regex = new RegExp(filterText, 'i');
                        return  filterText === '' || 
                                (filterOnCategories && regex.test(v.cat_name)) || 
                                (!filterOnrules && !filterOnCategories) ||
                                (filterOnrules && that.catContainsMatchingRule(v.rules, filterText));
                    }).map( (v,k) => 
                    <TreeNode title={v.cat_name} key={v.cat_id}>
                        { v.rules
                            .filter(function(v, k){
                                var regex = new RegExp(filterText, 'i');
                            return filterText === '' || 
                                    (regex.test(v.name) && filterOnrules) || 
                                    filterOnCategories || 
                                    (!filterOnrules && !filterOnCategories && regex.test(v.name));
                            })
                            .map((val,key)=> <TreeNode isLeaf title={val.name} icon={<FontAwesomeIcon className="mb-2" icon="wrench"/>} key={v.cat_id +"-"+key} onDoublClick={this.onDoublClick}/> ) }
                    </TreeNode>
                )}
                </Tree>

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