import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tree, { TreeNode } from 'rc-tree';
import 'rc-tree/assets/index.css';

class AuditRuleTree extends React.Component{
    static icon = "wrench";
    static label = "Network Audit";
    
    constructor(props){
        super(props)
    }
    
    render(){
        return (
                
        <div>
            <h6><FontAwesomeIcon icon={AuditRuleTree.icon}/> Network Audit Rules</h6>

                <div>
                <input type="text" className="form-control form-control-sm" placeholder="Search audit rules" aria-label="Search audit rules" aria-describedby="basic-addon1"/>
                    <Tree>
                        <TreeNode title="parent 1" key="0-1" icon={<FontAwesomeIcon className="mb-2" icon="folder"/>}>
                            <TreeNode title="parent 1-0" key="0-1-1" icon={<FontAwesomeIcon className="mb-2" icon="folder"/>}>
                              <TreeNode title="leaf" isLeaf icon={<FontAwesomeIcon className="mb-2" icon="file"/>}/>
                              <TreeNode title="leaf" icon={<FontAwesomeIcon className="mb-2" icon="file"/>}/>
                            </TreeNode>
                            <TreeNode title="parent 1-1" icon={<FontAwesomeIcon className="mb-2" icon="folder"/>}>
                              <TreeNode title="leaf" icon={<FontAwesomeIcon className="mb-2" icon="file"/>}/>
                            </TreeNode>
                        </TreeNode>
                    </Tree>
                </div>
        </div>
        );
    }
    
}

export default connect()(AuditRuleTree);