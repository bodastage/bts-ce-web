import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getReports, setReportFilter, deleteReport, getReportInfo, removeCategory,
         clearReportCreateState, clearReportTreeError, getCategory, 
         clearEditCategoryState, renameReportCategory } from './reports-actions';
import { addTab, closeTab } from '../layout/uilayout-actions';
import { Classes, Icon, ITreeNode, Tooltip, Tree, FormGroup, InputGroup, 
         ContextMenu, ContextMenuTarget, Menu, MenuDivider, MenuItem,
        ProgressBar, Dialog, TextArea, Intent, Spinner, Button} from "@blueprintjs/core";
import './reports-panel.css';

class ReportsTree extends React.Component{
    static icon = "table";
    static label = "Reports";
    
    constructor(props){
        super(props)
        
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.dismissError = this.dismissError.bind(this);
        this.showReportDataTab = this.showReportDataTab.bind(this);
        this.updateNodes = this.updateNodes.bind(this);
        this.onNodeDoubleClick = this.onNodeDoubleClick.bind(this);
        this.handleNodeCollapse = this.handleNodeCollapse.bind(this);
        this.showContextMenu = this.showContextMenu.bind(this);
        this.removeReport = this.removeReport.bind(this);
        this.renameCategory = this.renameCategory.bind(this);
        this.handleSaveCategory = this.handleSaveCategory.bind(this);

        this.state = {
            text: this.props.filter.text,
            categories: this.props.filter.categories,
            reports: this.props.filter.reports,
            nodesChanges: 0,
            expandedNodes:[],

            isContextMenuOpen: false,
          
          /*Category edit/rename dialog*/
            autoFocus: true,
            canEscapeKeyClose: true,
            canOutsideClickClose: true,
            enforceFocus: true,
            isOpen: false,
            usePortal: true,
            
            catName: ''
        };
        
        this.filterReports = this.state.reports;
        this.filterText = this.state.text;
        this.filterCategories = this.state.categories;
        
        this.nodes = [];
        
        //These hold the category name and notes while editting
        this.catName = this.props.edit_cat !== null ? this.props.edit_cat.name : "";
        this.catNote = this.props.edit_cat !== null ? this.props.edit_cat. notes : "";
        
        //This is used to show a progress bar while category details are loading
        this.fetchingCatInfo = false;
        
        //This is incremenet to force input and textare for category renaming to
        //re-render
        this.nameRedraw = 0;
        

    }
    
    handleSaveCategory(){
        this.props.dispatch(renameReportCategory(this.props.edit_cat.pk, this.catName, this.catNote));
    }
    
    /**
     * Delete report
     * 
     * @param Integer reportId report primary key
     */
    removeReport(reportId){
        this.props.dispatch(deleteReport(reportId))
        
        ContextMenu.hide();
    }
    
    openEditCategoryDialog = (categoryId) => { 
        console.log('categoryId:', categoryId);
        this.setState({ isOpen: true });
        this.props.dispatch(getCategory(categoryId));
        
        ContextMenu.hide();
    } 
    
    closeEditCategoryDialog = () => { 
        this.setState({ isOpen: false });
        this.props.dispatch(clearEditCategoryState());
        this.catName = "";
        this.catNote = "";
    }
    
    handleNotesChange = (event) => this.catNotes = event.target.value
    handleCatNameChange = (event) => this.catName = event.target.value
    
    renameCategory(categoryId){
        
    }
    /**
     * Show reports context menu
     * 
     * @param node
     * @param nodePath
     * @param e
     */
    showContextMenu(node, nodePath, e){
        e.preventDefault();

        // Add context menu based on entity type
        if(typeof node.reportId !== 'undefined'){
            ContextMenu.show(
                <Menu>
                    <MenuItem icon="th" text="View report" onClick={(ev) => {ev.preventDefault(); this.showReportDataTab(node.label, node.reportId);}}/>
                    <MenuItem icon="edit" text="Edit report" onClick={(ev) => {ev.preventDefault(); this.showEditTab(node.reportId)}} />
                    <MenuItem icon="graph-remove" text="Delete report" onClick={(ev) => {ev.preventDefault(); this.removeReport(node.reportId);}}/>
                </Menu>,
                { left: e.clientX, top: e.clientY },
                () => this.setState({ isContextMenuOpen: false }),
            );
        }else{ //category folder
            
            ContextMenu.show(
                <Menu>
                    <MenuItem icon="edit" text="Edit category" onClick={(ev) => {ev.preventDefault(); this.openEditCategoryDialog(node.catId)} } />
                    <MenuItem icon="delete" text="Delete category" onClick={(ev) => {ev.preventDefault(); this.deleteCategory(node.catId)} } />
                    
                </Menu>,
                { left: e.clientX, top: e.clientY },
                () => this.setState({ isContextMenuOpen: false }),
            );
            
        }
        
        this.setState({ isContextMenuOpen: true });

    }
    
    /**
     * Delete report category 
     * 
     */
    deleteCategory(catId){
        this.props.dispatch(removeCategory(catId));
    }
    
    /**
     * Handle change event on search input field
     * 
     * @param {type} event
     */
    handleChangeEvent(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
          [name]: value
        });
        
        switch(name){
            case 'text':this.filterText = value;break;
            case 'reports':this.filterReports = value;break;
            case 'categories':this.filterCategories = value;break;
        }
        
        this.updateFilter();
    }
    
    /**
     * Check whether list of reports provided contains atleast one matching the 
     * search string 
     * 
     * @param Array rules Array of rules
     * @param String search Search String
     * @returns {Boolean}
     */
    catContainsMatchingReport(reports, search){
        var regex = new RegExp(search, 'i');
        for(var key in reports){
            if ( regex.test(reports[key].name) ) return true;
        }
        return false;
    }
    
    /**
     * Update report search 
     * 
     * @returns {undefined}
     */
    updateFilter(){
        this.props.dispatch(setReportFilter(this.state.text, this.filterCategories, this.filterReports));
    }
    
    componentDidMount(){
        this.props.dispatch(getReports());
        
        this.updateNodes();
    }
    
    dismissError(){
        this.props.dispatch(clearReportTreeError());
    }
    
   
    showReportDataTab(reportName, reportId){ 
        let tabId = 'report_' + reportId + "_tab";
        
        this.props.dispatch(addTab(tabId, 'TableReport', {
            title: reportName,
            reportId: reportId
        }));
    }
    
    /**
     * Update tree nodes
     * 
     * @returns
     */
    updateNodes(){
        this.nodes = [];
        
        const filterText = this.state.text;
        const filterOnReports = this.state.reports;
        const filterOnCategories = this.state.categories;
        const noFilter = filterOnReports && filterOnCategories && (filterText === '');
        
        for(let key in this.props.reports){
            let cat = this.props.reports[key];
            
            //Filter categories
            var regex = new RegExp(filterText, 'i');
            if( (filterText !== "" && filterOnCategories && !regex.test(cat.cat_name)) ||
                (!this.catContainsMatchingReport(cat.reports, filterText) && filterOnReports )
              ){ 
                continue;
            }
        
            const isExpanded = this.state.expandedNodes.indexOf(cat.cat_id) !== -1
            const icon = isExpanded === true ? "folder-open": "folder-close"
            let reportCategory = {
                id: cat.cat_id,
                hasCaret: true,
                icon: icon,
                label: cat.cat_name,
                key: cat.cat_id,
                isExpanded : isExpanded,
                catId: cat.cat_id,
                childNodes: []        
            };
            
            //Get reports under category 
            for (let k in cat.reports){
                let report = cat.reports[k];
                
                //Filter rules
                if( (filterText !== "" && filterOnReports && !regex.test(report.name)) ){
                    continue;
                }
                
                reportCategory['childNodes'].push({
                    id: cat.cat_id + "-" + report.id,
                    label: report.name,
                    icon: "document",
                    reportId: report.id,
                    catId: cat.cat_id
                });
            }
            this.nodes.push(reportCategory);

        }
    }
    
    /**
     * Open report edit tab. This uses the same component as for creating new
     * reports. The reportId differentiates between create and edit.
     * 
     * @param {type} reportId
     * @returns {undefined}
     */
    showEditTab(reportId){
        let tabId  = 'create_report';
        
        //Close any open create tab
        this.props.dispatch(closeTab(tabId));
        this.props.dispatch(clearReportCreateState());
        
        //Fetch report details 
        this.props.dispatch(getReportInfo(reportId))
        
        this.props.dispatch(addTab(tabId, 'CreateReport', {
            title: 'Edit Report',
            reportId: reportId
        }));
                
    }

    /**
     * Show report table when report name is double clicked
     * 
     * @param {type} nodeData
     * @returns {undefined}
     */
    onNodeDoubleClick = (nodeData) => {

        if(typeof nodeData.reportId !== 'undefined'){
            this.showReportDataTab(nodeData.label, nodeData.reportId);
        }
    }
    
    handleNodeCollapse = (nodeData) => {
        const expandedNodes = this.state.expandedNodes.filter((v,k) => v !== nodeData.catId)
        this.setState({expandedNodes: expandedNodes});
    };

    handleNodeExpand = (nodeData) => {
        
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


        let defaultName = this.catName;
        let defaultNotes = this.catNotes;
        
        if(this.props.edit_cat !== null){
           if(this.props.edit_cat.requesting === false){
                defaultName = this.props.edit_cat.name;
                defaultNotes = this.props.edit_cat.notes;
                
                this.catName = defaultName;
                this.catNote = defaultNotes;
                
                //This forces the category name input fields and notes text area to be re-rendered
                this.nameRedraw +=  1;
           }
        }
        
        //Show progress bar when report details are being fetched 
        let catDetailsLoadingProgressBar = null;
        if( this.props.edit_cat !== null){
            catDetailsLoadingProgressBar = this.props.edit_cat.requesting === true ? <ProgressBar className="mb-2"/> : "";
        }
        
                                
        return (
            
        <div>
          <h6><FontAwesomeIcon icon={ReportsTree.icon}/> Reports</h6>
                <div>
                <FormGroup
                    label=""
                    labelFor="search_reports"
                >
                    <InputGroup 
                        id="search_network" 
                        placeholder="Search reports..." 
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
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox2" checked={this.state.reports} name="reports" onChange={this.handleChangeEvent}/>
                        <label className="form-check-label" htmlFor="inlineCheckbox2">Reports</label>
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
                
                {this.props.requestingReports === true ? <ProgressBar /> : ""}
                
            <Tree 
                contents={this.nodes}
                onNodeDoubleClick={this.onNodeDoubleClick}
                onNodeCollapse={this.handleNodeCollapse}
                onNodeExpand={this.handleNodeExpand}
                onNodeContextMenu={this.showContextMenu}
            />
            </div>
            
                <Dialog
                icon="folder-new"
                title="Edit report category"
                {...this.state}
                onClose={this.closeEditCategoryDialog}
                >
                
                
                    <div className={Classes.DIALOG_BODY}>
                    
                        {catDetailsLoadingProgressBar}
                    
                        <FormGroup
                            helperText=""
                            label="Category Name"
                            labelFor="text-input"
                            labelInfo=""
                        >
                        
                        
                        <InputGroup id="text-input" placeholder="Report category name" className='mb-1' onChange={this.handleCatNameChange} defaultValue={defaultName} key={this.nameRedraw}/>
                        </FormGroup>       
                        
                        <FormGroup
                            helperText=""
                            label="Notes"
                            labelFor=""
                            labelInfo=""
                        >
                            <TextArea
                                key={this.nameRedraw}
                                placeholder="Report category notes"
                                large={true}
                                intent={Intent.PRIMARY}
                                onChange={this.handleNotesChange}
                                defaultValue={defaultNotes}
                                className='mb-1'
                                fill={true}
                                
                            />
                        </FormGroup>
                        
                        <Button icon="plus" intent='success' text="Save" onClick={this.handleSaveCategory} disabled={false} /> 
                    </div>
                </Dialog>
        </div>
        );
    }
    
}
    
function mapStateToProps(state){

    return {
        reports: state.reports.reports, //categories
        filter: state.reports.filter,
        requestingReports: state.reports.requestingReports,
        requestError: state.reports.requestError,
        edit_cat: state.reports.edit_cat
    };
    
    
}

export default connect(mapStateToProps)(ReportsTree);