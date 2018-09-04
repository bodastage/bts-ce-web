import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addTab } from '../layout/uilayout-actions';
import { Tree, ITreeNode, Button, Intent, FormGroup, InputGroup, Icon,
         Classes, ContextMenu, ContextMenuTarget, Menu, MenuDivider, MenuItem } 
    from "@blueprintjs/core";
import { addToExpandedLiveNodes, removeFromExpandedLiveNodes, populateNetworkTree,
    filterNetworkTree } from '../networkbrowser/network-browser-actions'

class NetworkTree extends React.Component{
    constructor(props){
        super(props);
        this.nodes = []
        
        this.updateNodes = this.updateNodes.bind(this)
        this.handleNodeCollapse = this.handleNodeCollapse.bind(this)
        this.onNodeDoubleClick = this.onNodeDoubleClick.bind(this)
        this.handleChangeEvent = this.handleChangeEvent.bind(this)
        this.showContextMenu = this.showContextMenu.bind(this)
        
        this.state = { isContextMenuOpen: false };
    }
    
    componentDidMount(){
        if(this.props.requesting_tree_data === true){
            this.props.dispatch(populateNetworkTree(this.props.live_tree_request_state));            
        }

    }
    
    onNodeDoubleClick(nodeData){
        console.log("nodeData", nodeData)
        if (nodeData.entityType === 'cell'){
            const cellId = nodeData.entityId
            let tabId = 'cell_view_' + cellId + "_Tab";
            this.props.dispatch(addTab(tabId, 'CellView', {
                title: nodeData.label
            }));
        }

    }
    
    handleNodeExpand = (nodeData: ITreeNode) => {
        this.props.dispatch(addToExpandedLiveNodes(nodeData.id));
    };
    
    handleNodeCollapse = (nodeData: ITreeNode) => {
        this.props.dispatch(removeFromExpandedLiveNodes(nodeData.id));
    };
    
    handleChangeEvent(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.props.dispatch(filterNetworkTree(value));

    }
    
    showContextMenu(node, nodePath, e){
        e.preventDefault();
        return;
        
        
        // Add context menu based on entity type
        ContextMenu.show(
            <Menu>
                <MenuItem icon="search-around" text="Search around..." />
                <MenuItem icon="search" text="Object viewer" />
                <MenuItem icon="graph-remove" text="Remove" />
                <MenuItem icon="group-objects" text="Group" />
                <MenuDivider />
                <MenuItem disabled={true} text="Clicked on node" />
            </Menu>,
            { left: e.clientX, top: e.clientY },
            () => this.setState({ isContextMenuOpen: false }),
        );

        this.setState({ isContextMenuOpen: true });
    }
    /**
     * Create BluePrint node list
     * 
     * @param nodeList 
     */
    createBPNodeList(nodeList){
        let nodes = [];
        for(let k in nodeList){
            let node = nodeList[k]
            let  hasCaret = typeof node.children != 'undefined' ? true : false;
            let icon = node.type === 'site' ? 'cell-tower' : 'widget-button'
            icon = node.type === 'cell' ? 'feed' : icon
            icon = node.type === 'rnc' ? 'widget-header' : icon
            
            let isExpanded = this.props.live_expanded_nodes.indexOf(node.id) != -1
            let children = typeof node.children === 'undefined' ? [] : this.createBPNodeList(node.children)
            let secondaryLabel = typeof node.count != 'undefined' ? node.count : ""
            
            const searchText = this.props.tree_filter.text
            if (searchText != ''){
                var regex = new RegExp(searchText, 'i')
                if ( children.length === 0 && !regex.test(node.name) ) continue;
            }
            nodes.push(
                {
                    icon: icon, 
                    id: node.id, 
                    label: node.name, 
                    hasCaret: hasCaret,
                    isExpanded: isExpanded,
                    childNodes: children,
                    secondaryLabel: secondaryLabel,
                    entityId: node.entityId,
                    entityType: node.type
                }
            )
        }
        
        return nodes;
    }
    
    /**
     * Update the node list to show in the tree
     * 
     */
    updateNodes(){
        this.nodes = this.createBPNodeList(this.props.live_tree)
    }
    
    componentDidUpdate(prevProps){
        if(this.props.requesting_tree_data === true){
            this.props.dispatch(populateNetworkTree(this.props.live_tree_request_state));            
        }
    }
    
    render(){
        this.updateNodes();
        
        return (
            <div>
                <h6><FontAwesomeIcon icon="sitemap"/> Network Tree</h6>
                        
                <FormGroup
                    label=""
                    labelFor="search_network"
                >
                    <InputGroup id="search_network" placeholder="Search network.." 
                        leftIcon="search" 
                        name="search_network"
                        onChange={this.handleChangeEvent}
                        value={this.props.tree_filter.text} 
                        type="text"/>
                </FormGroup>
                
        <div className="mb-1">
        <FontAwesomeIcon icon="sitemap" className="live-network-color"/> <span>Live network</span>
            {this.props.requesting_tree_data === false ? "" : <span className="float-right"><FontAwesomeIcon icon="spinner" spin size="lg"/></span>}
        </div>

        <Tree className="live-network-color"
            contents={this.nodes}
            onNodeDoubleClick={this.onNodeDoubleClick}
            onNodeExpand={this.handleNodeExpand}
            onNodeCollapse={this.handleNodeCollapse}
            onNodeContextMenu={this.showContextMenu}
        />
            
            </div> 
        );
    }
}

function mapStateToProps(state){
    return {
        live_tree: state.networkbrowser.live_tree,
        live_expanded_nodes: state.networkbrowser.live_expanded_nodes,
        requesting_tree_data: state.networkbrowser.requesting_tree_data,
        live_tree_request_state: state.networkbrowser.live_tree_request_state,
        tree_filter: state.networkbrowser.tree_filter
    };
}

export default connect(mapStateToProps)(NetworkTree);