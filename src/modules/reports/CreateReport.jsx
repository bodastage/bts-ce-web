import React from 'react';
import { render } from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace';
import { connect } from 'react-redux';
import 'brace/mode/sql';
import 'brace/theme/github';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ResizeSensor, FormGroup, InputGroup, Button, TextArea, Intent, Spinner,
         Callout, Menu, MenuItem, ProgressBar  } from "@blueprintjs/core";
import { Select, ItemListRenderer } from "@blueprintjs/select";
import { AgGridReact } from 'ag-grid-react';
import { getQueryForAGGridSortAndFilter } from '../../utils/aggrid-to-jqdt-queries';
import axios from '../../api/config';
import { requestCreateReportFields, clearPreviewReportError,
         createReportPreviewError, clearReportCreateState, 
         createOrUpdateReport, getReport } from './reports-actions';

import './create-report-styles.css'

class CreateReport extends React.Component{
    static icon = "table";
    static label = "Create Report";
    
    constructor(props){
        super(props);
        
        this.loadPreview = this.loadPreview.bind(this)
        
        this.state = {
            notesValuve: "",
            loadPreview: false,
            columns: [],
            
            //AgGrid properties
            columnDefs: [],
            rowData: [
            ],
            rowBuffer: 0,
            rowSelection: "multiple",
            rowModelType: "infinite",
            paginationPageSize: 100,
            cacheOverflowSize: 2,
            maxConcurrentDatasourceRequests: 2,
            infiniteInitialRowCount: 1,
            maxBlocksInCache: 2,
            
            //Download Alert state
            canEscapeKeyCancel: false,
            canOutsideClickCancel: false,
            isOpen: false,
            isOpenError: false,
            
            //
            category: this.props.categories[0]
        }
        
        this.handleNotesChange = this.handleNotesChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.onGridReady = this.onGridReady.bind(this)
        this.onAceChange = this.onAceChange.bind(this)
        this.updateColumnDefs = this.updateColumnDefs.bind(this)
        
        this.aceEditorValue = "Write report query here";
        this.reportName = "New Report";
        this.reportNotes = "Some notes on the report";
        this.previewError = null;
        this.agTblReload = 1; //used to reload the aggrid table
        
        //Preview table 
        this.columnDef = []
        
        //Category Select
        this.categoryItemRenderer = this.categoryItemRenderer.bind(this)
        this.handleCategoryValueChange = this.handleCategoryValueChange.bind(this)
        
        this.saveReport = this.saveReport.bind(this)
        
        this.fetchingReportInfo = false;
        
        //This is an edit instance
        if( typeof this.props.options.reportId !== 'undefined' ){
            const reportId = this.props.options.reportId;
//            this.props.dispatch(getReport(reportId));
            this.fetchingReportInfo = true;
        }
        
        
        this.nameRedraw = 0;
        
    }
 
 
    componentWillMount(){
        
    }
    
    componentDidMount(){
        console.log("componentWill")
        
        if( typeof this.props.options.reportId !== 'undefined' ){
            if(this.props.reportInfo === null){
                this.fetchingReportInfo = true;
            }
        }
    }
    
    componentWillUnmount(){

        this.props.dispatch(clearReportCreateState());
                
        this.props.dispatch(clearPreviewReportError());
        
    }
    
    handleCategoryValueChange(category) { 
        this.setState({ category: category});
    }
        
    saveReport(){
        this.setState({loadPreview: false});
        
        this.props.dispatch(createOrUpdateReport({
            name: this.reportName,
            category_id: this.state.category.id,
            notes: this.reportNotes,
            qry: this.aceEditorValue,
            reportId: this.props.reportInfo !== null ? this.props.reportInfo.id : null,
            options: {}
        }));
    }
    
    renderCategoryList(items, itemsParentRef, query, renderItem){
        const renderedItems = items.map(renderItem).filter(item => item != null);
        return (
            <Menu ulRef={itemsParentRef}>
                <MenuItem
                    disabled={true}
                    text={`Found ${renderedItems.length} items matching "${query}"`}
                />
                {renderedItems}
            </Menu>
        );
    }
    
    categoryItemListRenderer({items, itemsParentRef, query, renderItem}){
        const renderedItems = items.map(renderItem).filter(item => item != null);
        return (
            <Menu ulRef={itemsParentRef}>
                <MenuItem
                    disabled={true}
                    text={`Found ${renderedItems.length} items matching "${query}"`}
                />
                {renderedItems}
            </Menu>
        );
    }
    categoryItemPredicate(query, category){
        return category.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    }
    categoryItemRenderer( category, {handleClick, modifiers} ){
        if (!modifiers.matchesPredicate) {
                return null;
            }
            return (
                <MenuItem
                    active={modifiers.active}
                    key={category.id}
                    label=""
                    onClick={handleClick}
                    text={category.name}
                />
            );
    }

    
    loadPreview(){
        this.setState({loadPreview: true})
        
        this.props.dispatch(requestCreateReportFields(this.reportName, this.aceEditorValue, {}));
        this.props.dispatch(clearPreviewReportError());
        
        //this is incremented to reload/redraw the aggrid
        this.agTblReload += 1;
    }
    
    onAceChange(newValue){
        this.aceEditorValue = newValue;
    }
    
    handleNotesChange(event){
        this.reportNotes = event.target.value;
    }
    
    handleNameChange(event){
        this.reportName = event.target.value;
    }
    
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        let _columnApi =  params.columnApi;
        let token = this.props.token;
        let _fields = this.props.fields;
        let _dispatch = this.props.dispatch;
        let reportId = this.props.options.reportId;
        
        let postData = {name: this.reportName, qry: this.aceEditorValue};
        
        let dataSource = {  
            rowCount: null,
            getRows: function(params) {
                let page = params.startRow;
                let length= params.endRow - params.startRow;
                let apiEndPoint = "/api/reports/create/dt?start="+  page + "&length=" + length;
                
                let query = getQueryForAGGridSortAndFilter( _fields, 
                        params.sortModel, params.filterModel, _columnApi.getAllColumns());
                
                apiEndPoint += "&" + query;
                
                axios.post(apiEndPoint, postData, {
                    headers: { "Authorization": token }
                })
                .then(response => {
                    var lastRow = response.data.recordsFiltered;
                    params.successCallback(response.data.data, lastRow);
                })
                .catch(function(error){
                    if(typeof error.response === 'undefined'){
                        _dispatch(createReportPreviewError(error.toString()));
                    }else{
                        _dispatch(createReportPreviewError(error.response.data));
                    }
                });
            }
        };
        this.gridApi.setDatasource(dataSource);
    }
    
    updateColumnDefs(){
        this.columnDef = [];
        if( typeof this.props.fields === 'undefined'  ) return;
        for(var key in this.props.fields){
            let columnName = this.props.fields[key]
            this.columnDef.push(
                {headerName: columnName, field: columnName,  
                 filter: "agTextColumnFilter"},);
        }
    }
    
    render(){
        const { spinnerSize, spinnerHasValue, spinnerIntent, spinnerValue, columns, loadPreview, category } = this.state;
        const tabTitle = this.props.options.title;
        
        let defaultName = this.reportName;
        let defaultNotes = this.reportNotes;
        let activeItem   = this.state.category;
        
        if(this.fetchingReportInfo === true && this.props.reportInfo !== null){ 
            
            this.aceEditorValue = this.props.reportInfo.query;
            this.reportName = this.props.reportInfo.name;

            //This is changed to force re-rendering of the inputGroup and textarea
            this.nameRedraw +=  1;
            
            defaultName =  this.props.reportInfo.name;
            defaultNotes = this.props.reportInfo.notes;
            activeItem = {id: this.props.reportInfo.category_id, name: 'Category'}
            
            //Set the default category in the select search
            for(let c in this.props.categories){
                const cat = this.props.categories[c];
                if(cat.id === this.props.reportInfo.category_id){
                    activeItem = cat;
                    break;
                }
            }

            //@TODO: Move this out of render. render() should not have side effects
            //For now, it remains here so that we can move forward
            this.setState({category: activeItem });
            
            //This ensures the defualt are not reset back on every re-render
            this.fetchingReportInfo = false;
        }
        
        //fetchingReportInfo is set to true because the request to get the report 
        //details some times delays
        if( typeof this.props.options.reportId !== 'undefined' ){
            if(this.props.reportInfo === null){
                this.fetchingReportInfo = true;
            }
        }
        
        //Update preview area
        let previewTable;
        if( this.props.previewError !== null && loadPreview === true ){
            previewTable=<Callout icon="error" intent={Intent.DANGER} title="Error with preview">{this.props.previewError}</Callout>;
        }else if(this.props.fields.length === 0 && loadPreview === true){
            previewTable = <Spinner intent={spinnerIntent} size={spinnerSize}/>
        }else if(this.props.fields.length === 0 && loadPreview === false){
            previewTable = <span>Preview report here...</span>
        }else{
                this.updateColumnDefs();
                previewTable = <div className="ag-theme-balham" 
                                    style={{width: '100%', height: "100%", boxSizing: "border-box"}}
                                    key={"create-table-key-" + this.agTblReload}
                                >
                            <AgGridReact
                                pagination={true}
                                gridAutoHeight={true}
                                columnDefs={this.columnDef}
                                components={this.state.components}
                                enableColResize={true}
                                rowBuffer={this.state.rowBuffer}
                                rowSelection={this.state.rowSelection}
                                rowDeselection={true}
                                rowModelType={this.state.rowModelType}
                                paginationPageSize={this.state.paginationPageSize}
                                cacheOverflowSize={this.state.cacheOverflowSize}
                                maxConcurrentDatasourceRequests={this.state.maxConcurrentDatasourceRequests}
                                infiniteInitialRowCount={this.state.infiniteInitialRowCount}
                                maxBlocksInCache={this.state.maxBlocksInCache}
                                enableServerSideSorting={true}
                                enableServerSideFilter={true}
                                onGridReady={this.onGridReady.bind(this)}
                                >
                            </AgGridReact>
                        </div>
        }
        
        return (
        <div className='cotainer p-0 m-0 mr-2'>
            <h3><FontAwesomeIcon icon="table"/> {tabTitle}</h3>
            {this.props.creating === true || this.fetchingReportInfo === true ? <ProgressBar intent={Intent.PRIMARY} className="mb-2"></ProgressBar> : ""}
            <div className="row">
                <div className="col-sm">
                    <div className="mb-2">
                    <AceEditor
                        ref="aceEditor"
                        mode="sql"
                        theme="github"
                        onChange={this.onAceChange}
                        name="create_or_edit_report"
                        editorProps={{$blockScrolling: true}}
                        maxLines={15}
                        minLines={15}
                        value={this.aceEditorValue}
                      />        
                      </div>
                </div>
                  
                <div className="col-sm">
                <Select 
                    key={this.nameRedraw}
                    noResults={<MenuItem disabled={true} text="No categories." />}
                    items={this.props.categories}
                    itemListRenderer={this.categoryItemListRenderer}
                    itemRenderer={this.categoryItemRenderer}
                    itemPredicate={this.categoryItemPredicate}
                    onItemSelect={this.handleCategoryValueChange}
                    activeItem={activeItem}
                    initialContent={<MenuItem disabled={true} text="Category" />}
                        >
                    <Button
                        icon="folder-close"
                        rightIcon="caret-down"
                        text={category ? `${category.name}` : "(No selection)"}
                        disabled={false}
                        className="mb-2"
                    />        
                </Select>
                
                    <FormGroup
                        helperText=""
                        label="Report Name"
                        labelFor="text-input"
                        labelInfo=""
                    >
                    <InputGroup id="text-input" placeholder="Report name" className='mb-1' onChange={this.handleNameChange} defaultValue={this.reportName} key={this.nameRedraw}/>
                    </FormGroup>
                    <FormGroup
                        helperText=""
                        label="Notes"
                        labelFor=""
                        labelInfo=""
                        >
                        <TextArea
                            large={true}
                            intent={Intent.PRIMARY}
                            onChange={this.handleNotesChange}
                            value={this.state.notesValue}
                            className='mb-1'
                            defaultValue={defaultNotes}
                            fill={true}
                            key={this.nameRedraw}
                        />

                        <Button icon="refresh" text="Preview"  onClick={this.loadPreview} />  <Button icon="plus" intent='success' text="Save" onClick={this.saveReport} disabled={this.props.creating === true ? true : false}/>
                        
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-sm mt-2">
                        {previewTable}
                </div>
            </div>
        </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    let reportInfo = null //holds details of report to be editted
    
    if(typeof ownProps.options.reportId !== 'undefined'){
        const reportId = ownProps.options.reportId
        if(typeof state.reports.reportInfo[reportId] !== 'undefined'){ 
            reportInfo = state.reports.reportInfo[reportId] 
        }
    }
    
    return {
        previewError: state.reports.create.error,
        token: state.session.userDetails.token,
        fields: state.reports.create.fields,
        categories: state.reports.reports.map(r => ({id: r.cat_id, name: r.cat_name}) ),
        creating: state.reports.create.creating,
        reportInfo: reportInfo
    };
}

export default connect(mapStateToProps)(CreateReport);
