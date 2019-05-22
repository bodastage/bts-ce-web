import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js';
import { setSidePanel, addTab, closeTab } from '../layout/uilayout-actions';
import { Dialog, Classes, InputGroup, Intent, TextArea, FormGroup, Button, 
         Spinner } from "@blueprintjs/core";
import { saveCategory, clearReportCreateState } from "./reports-actions"

class Reports extends React.Component{
    static icon = "table";
    static label = "Reports";
    constructor(props){
        super(props);
        this.setSidePanel = this.setSidePanel.bind(this);
        
        this.createReport = this.createReport.bind(this)
        this.openCreateCategoryDialog = this.openCreateCategoryDialog.bind(this)
        this.handleSave = this.handleSave.bind(this)
        
        this.state = { 
            autoFocus: true,
            canEscapeKeyClose: true,
            canOutsideClickClose: true,
            enforceFocus: true,
            isOpen: false,
            usePortal: true,
        }
        
        this.layout = {};
        
        this.data = [];
        
        //This shows the saving spinner when true
        this.isSaving  = false;
        
        this.catNames = "Category name";
        this.catNotes = "Category notes";
        
    }
 
    handleNotesChange = (event) => this.catNotes = event.target.value
    handleCatNameChange = (event) => this.catName = event.target.value
    
    componentDidMount(){

    }
    
    createReport = () => {
        let tabId  = 'create_report';
        
        //Close any open create tab
        //This is to fix a bug caused by create and edit using the same component
        this.props.dispatch(closeTab(tabId));
        this.props.dispatch(clearReportCreateState());
        
        //The delay is toe ensure the previous close has time to clean up
        setTimeout(()=>{
            this.props.dispatch(addTab(tabId, 'CreateReport', {
                title: 'Create Report'
            }));
        },10)

    }
    
    handleSave = () => {
        this.props.dispatch(saveCategory(this.catName, this.catNotes));
        this.isSaving  = true;
    }
    
    setSidePanel(){
        this.props.dispatch(setSidePanel('ReportsTree'));
    }
    
    openCreateCategoryDialog = () => this.setState({ isOpen: true });
    closeCreateCategoryDialog = () => this.setState({ isOpen: false });
    
    render(){
        const height = window.innerHeight - 200;
        return (
        <div>
            <h3><FontAwesomeIcon icon="table"/> Reports</h3>

            <div className="card  mb-2">
                <div className="card-body p-3">
                    <a href="#" className="launch-network-tree" onClick={this.setSidePanel}><FontAwesomeIcon icon="arrow-right"/> Show report tree</a>        
                    <br/>
                    <br/>
                    <a href="#" className="launch-network-tree" onClick={this.createReport}><FontAwesomeIcon icon="arrow-right"/> Create report</a>        
                   
                    <br/>
                    <br/>
                    <a href="#" className="launch-network-tree" onClick={this.openCreateCategoryDialog}><FontAwesomeIcon icon="arrow-right"/> Create report category</a>        
                   
                </div>
            </div>
            
                <Dialog
                icon="folder-new"
                title="Add report category"
                {...this.state}
                onClose={this.closeCreateCategoryDialog}
                >
                
                    <div className={Classes.DIALOG_BODY}>
                        <FormGroup
                            helperText=""
                            label="Category Name"
                            labelFor="text-input"
                            labelInfo=""
                        >
                        <InputGroup id="text-input" placeholder="Report category name" className='mb-1' onChange={this.handleCatNameChange}/>
                        </FormGroup>       
                        
                        <FormGroup
                            helperText=""
                            label="Notes"
                            labelFor=""
                            labelInfo=""
                        >
                            <TextArea
                                placeholder="Report category notes"
                                large={true}
                                intent={Intent.PRIMARY}
                                onChange={this.handleNotesChange}
                                value={this.state.notesValue}
                                className='mb-1'
                                fill={true}
                            />
                        </FormGroup>
                        
                        <Button icon="plus" intent='success' text="Save" onClick={this.handleSave} disabled={this.props.requesting} />  {this.props.requesting === true ? <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_SMALL}/> : ""}
                    </div>
                </Dialog>
        </div>
        );
    }
}

function mapStateToProps(state){
    return {
        requesting: state.reports.newCat.requesting,
    };
}

export default connect(mapStateToProps)(Reports);