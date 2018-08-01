import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tree, { TreeNode } from 'rc-tree';
import 'rc-tree/assets/index.css';

class ReportsPanel extends React.Component{
    static icon = "chart-area";
    static label = "Reports";
    constructor(props){
        super(props);
    }

    
    render(){
        return (
        <div>
            <h6><FontAwesomeIcon icon={ReportsPanel.icon}/> Reports</h6>

                <div>
                <input type="text" className="form-control form-control-sm" placeholder="Search reports" aria-label="Search" aria-describedby="basic-addon1"/>
                    <Tree>
                        <TreeNode title="Favourites" key="0-1" icon={<FontAwesomeIcon className="mb-2" icon="star"/>}>
                            <TreeNode title="parent 1-0" key="0-1-1" icon={<FontAwesomeIcon className="mb-2" icon="folder"/>}>
                              <TreeNode title="leaf" isLeaf icon={<FontAwesomeIcon className="mb-2" icon="file"/>}/>
                              <TreeNode title="leaf" icon={<FontAwesomeIcon className="mb-2" icon="file"/>}/>
                            </TreeNode>
                            <TreeNode title="parent 1-1" icon={<FontAwesomeIcon className="mb-2" icon="folder"/>}>
                              <TreeNode title="leaf" icon={<FontAwesomeIcon className="mb-2" icon="file"/>}/>
                            </TreeNode>
                        </TreeNode>
                        <TreeNode title="PM" key="1-1" icon={<FontAwesomeIcon className="mb-2" icon="folder"/>}>
                            <TreeNode title="GSM" key="1-1-1" icon={<FontAwesomeIcon className="mb-2" icon="folder"/>}>
                              <TreeNode title="leaf" isLeaf icon={<FontAwesomeIcon className="mb-2" icon="file"/>}/>
                              <TreeNode title="leaf" icon={<FontAwesomeIcon className="mb-2" icon="file"/>}/>
                            </TreeNode>
                            <TreeNode title="UMTS" icon={<FontAwesomeIcon className="mb-2" icon="folder"/>}>
                              <TreeNode title="leaf" icon={<FontAwesomeIcon className="mb-2" icon="file"/>}/>
                            </TreeNode>
                        </TreeNode>
                    </Tree>
                </div>
        </div>
        );
    }
}

export default connect()(ReportsPanel);