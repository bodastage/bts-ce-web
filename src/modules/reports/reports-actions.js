import axios, { ERROR_CODES } from '../../api/config';

export const REQUEST_REPORTS = 'REQUEST_REPORTS';
export const RECEIVE_REPORTS = 'RECEIVE_REPORTS';
export const NOTIFY_REPORT_REQUEST_ERROR = 'NOTIFY_REQUEST_ERROR';
export const DISMISS_REPORT_REQUEST_ERROR = 'DISMISS_REQUEST_ERROR';

export const REQUEST_REPORT_FIELDS = 'REQUEST_REPORT_FIELDS';
export const RECEIVE_REPORT_FIELDS = 'RECEIVE_REPORT_FIELDS';
export const NOTIFY_REPORT_FIELDS_REQUEST_ERROR = 'NOTIFY_REPORT_FIELDS_REQUEST_ERROR';
export const DISMISS_REPORT_FIELDS_REQUEST_ERROR = 'DISMISS_REPORT_FIELDS_REQUEST_ERROR';

export const DOWNLOAD_REPORT = 'DOWNLOAD_REPORT';
export const REPORT_DOWNLOAD_REQUEST_SUCCESS = 'REPORT_DOWNLOAD_REQUEST_SUCCESS';
export const RECEIVE_DOWNLOAD_STATUS = 'RECEIVE_DOWNLOAD_STATUS';
export const SET_DOWNLOAD_STATUS = 'SET_DOWNLOAD_STATUS';
export const CLEAR_DOWNLOAD_STATUS = 'CLEAR_DOWNLOAD_STATUS';

export const SET_REPORTS_FILTER = 'SET_REPORTS_FILTER';

export const CREATE_RPT_REQUEST_FIELDS = 'CREATE_RPT_REQUEST_FIELDS';
export const CREATE_RPT_RECEIVE_FIELDS = 'CREATE_RPT_RECEIVE_FIELDS';

//Preview error
export const CREATE_RPT_PRVW_ERROR = 'CREATE_RPT_PRVW_ERROR';
export const CREATE_RPT_CLEAR_ERROR = 'CREATE_RPT_CLEAR_ERROR';
export const CREATE_RPT_CLEAR_STATE = 'CREATE_RPT_CLEAR_STATE';

//Signals start of server request
export const CREATE_REPORT_REQUEST = 'CREATE_REPORT_REQUEST';

//Signals end of server request
export const CONFIRM_REPORT_CREATED = 'CONFIRM_REPORT_CREATED';

export const REQUEST_REPORT_DELETION = 'REQUEST_REPORT_DELETION';
export const CONFIRM_REPORT_DELETION = 'CONFIRM_REPORT_DELETION';

export const REQUEST_REPORT = 'REQUEST_REPORT';
export const RECEIVE_REPORT = 'RECEIVE_REPORT';

/**
 * Send report category request action
 */
export const SEND_CREATE_RPT_CATEGORY_REQ = 'SEND_CREATE_RPT_CATEGORY_REQ';
export const CONFIRM_RPT_CATEGORY_CREATION = 'CONFIRM_RPT_CATEGORY_CREATION';

export const SEND_DELETE_RPT_CATEGORY_REQ = 'SEND_DELETE_RPT_CATEGORY_REQ';

//Rename report category request
export const SEND_RENAME_RPT_CATEGORY_REQ = 'SEND_RENAME_RPT_CATEGORY_REQ';

//Action that confirms that the category was created
export const CONFIRM_RPT_CATEGORY_DELETION = 'CONFIRM_RPT_CATEGORY_DELETION';

//Confirm the category has been renamed
export const CONFIRM_RPT_CATEGORY_RENAMING = 'CONFIRM_RPT_CATEGORY_RENAMING';

export const NOTIFY_REPORT_CATEGORY_RENAME_ERROR = 'NOTIFY_REPORT_CATEGORY_RENAME_ERROR';

export const NOTIFY_REPORT_CATEGORY_CREATION_ERROR = 'NOTIFY_REPORT_CATEGORY_CREATION_ERROR';

export const CLEAR_REPORT_TREE_ERROR = 'CLEAR_REPORT_TREE_ERROR';

export const REQUEST_REPORT_CATEGORY = 'REQUEST_REPORT_CATEGORY';
export const CONFIRM_REPORT_CATEGORY_RECEIVED = 'CONFIRM_REPORT_CATEGORY_RECEIVED';


export function notifyReportCategoryRenameError(categoryId, error){
    return {
        type: NOTIFY_REPORT_CATEGORY_RENAME_ERROR,
        categoryId: categoryId,
        error: error
    }
}
/**
 * 
 * @type StringClears the state.edit_cat state
 */
export const CLEAR_EDIT_RPT_CATEGORY = 'CLEAR_EDIT_RPT_CATEGORY';

/**
 * Confirm that the report category rename/edit request has been successful
 * 
 * @param {type} categoryId
 * @returns {confirmReportCategoryRenaming.reports-actionsAnonym$0}
 */
export function confirmReportCategoryRenaming(categoryId){
    return {
        type: CONFIRM_RPT_CATEGORY_RENAMING
    }
}

/**
 * Mark beginning of report category rename request 
 * 
 * @returns {sendRenameReportCategoryRequest.reports-actionsAnonym$1}
 */
export function sendRenameReportCategoryRequest(){
    return {
        type: SEND_RENAME_RPT_CATEGORY_REQ
    }
}

export function clearEditCategoryState(){
    return {
        type: CLEAR_EDIT_RPT_CATEGORY
    }
}


export function sendCreateReportCategoryRequest(){
    return {
        type: SEND_CREATE_RPT_CATEGORY_REQ
    }
}

export function confirmReportCategoryCreation(category){
    return {
        type: CONFIRM_RPT_CATEGORY_CREATION,
        category: category
    }
}

export function sendDeleteReportCategoryRequest(){
    return {
        type: SEND_DELETE_RPT_CATEGORY_REQ
    }
}

export function requestReportDeletion(reportId){
    return {
        type: REQUEST_REPORT_DELETION,
        reportId: reportId
    }
}

export function confirmReportDeletion(reportId){
    return {
        type: CONFIRM_REPORT_DELETION,
        reportId: reportId
    }
}

export function clearReportTreeError(){
    return {
        type: CLEAR_REPORT_TREE_ERROR
    }
}

export function deleteReport(reportId){
    return (dispatch, getState) => {
        dispatch(requestReportDeletion());
        
        const authToken = getState().session.userDetails.token;
        let apiEndPoint = "/api/reports/" + reportId;

        axios.delete(apiEndPoint, {
            headers: { "Authorization": authToken }
        })
        .then(response => {
            dispatch(getReports());
            return dispatch(confirmReportDeletion("Report successfully deleted."));
        })
        .catch(function(error){
            //@TODO: Notify deletion failure
        });
    }
}

export function requestReport(reportId){
    return {
        type: REQUEST_REPORT,
        reportId: reportId
    }
}

export function confirmReportCreation(){
    return { type: CONFIRM_REPORT_CREATED };
}

export function createReportRequest(){
    return {
        type: CREATE_REPORT_REQUEST
    }
}

export function createOrUpdateReport({name, category_id, notes, qry, reportId, options}){
   return (dispatch, getState) => {
        dispatch(createReportRequest());
        
        const authToken = getState().session.userDetails.token;
        let apiEndPoint = "/api/reports/create";
        
        let data = {
            name: name,
            category_id: category_id,
            notes: notes,
            qry: qry,
            options: JSON.stringify(options)
        };
        
        if( reportId !== null ) {
            data = {...data, report_id: reportId}
//            apiEndPoint += '/' + reportId;
            
        }

        axios.post(apiEndPoint, data, {
            headers: { "Authorization": authToken }
        })
        .then(response => {
            dispatch(getReports());
            return dispatch(confirmReportCreation(response.data));
        })
        .catch(function(error){
            if(typeof error.response === 'undefined'){
                return dispatch(createReportPreviewError(error.toString()));
            }else{
                return dispatch(createReportPreviewError(error.response.data));
            }
        });
    }
}

export function clearReportCreateState(){
    return {
        type: CREATE_RPT_CLEAR_STATE
    }
}

export function clearPreviewReportError(){
    return {
        type: CREATE_RPT_CLEAR_ERROR
    }
}

/**
 * reportId  is used when the error is during and edit of the report.
 * 
 * @param {type} error
 * @param {type} reportId ID of the report being editted.
 * @returns {createReportPreviewError.reports-actionsAnonym$9}
 */
export function createReportPreviewError(error, reportId){
    return {
        type: CREATE_RPT_PRVW_ERROR,
        error: error,
        reportId: reportId
    }
}

export function requestReports(){
    return {
        type: REQUEST_REPORTS
    };
}

export function receiveReports(reports){
    return {
        type: RECEIVE_REPORTS,
        reports: reports
    };
}

export function notifyReportRequestError(error){
    return {
        type: NOTIFY_REPORT_REQUEST_ERROR,
        error: error
    };
}

export function dismissReportRequestError(){
    return {
        type: DISMISS_REPORT_REQUEST_ERROR
    };
}

export function setReportFilter(filterText, filterCategories, filterReport){
    return {
        type: SET_REPORTS_FILTER,
        filter: {
            text: filterText,
            categories: filterCategories, 
            reports: filterReport 
        }
    };
}

export function receiveReportFields(reportId, fields){
    return {
        type: RECEIVE_REPORT_FIELDS,
        reportId: reportId,
        fields: fields
    };
}

export function requestReportFields(reportId){
    return {
        type: REQUEST_REPORT_FIELDS,
        reportId: reportId
    };
}

export function receiveCreateReportFields(fields){
    return {
        type: CREATE_RPT_RECEIVE_FIELDS,
        fields: fields
    }
}

export function requestCreateReportFields(name,qry, options){
    return (dispatch, getState) => {
        dispatch(createReportFields(name,qry, options));
        
        const authToken = getState().session.userDetails.token;
        let apiEndPoint = "/api/reports/create/fields";
        
        let data = {
            name: name,
            qry: qry,
            options: options
        };
        axios.post(apiEndPoint, data, {
            headers: { "Authorization": authToken }
        })
        .then(response => {
            return dispatch(receiveCreateReportFields(response.data));
        })
        .catch(function(error){
            if(typeof error.response === 'undefined'){
                return dispatch(createReportPreviewError(error.toString()));
            }else{
                return dispatch(createReportPreviewError(error.response.data));
            }
            
        });
    }
}

/**
 * Get fields during report creation
 * @param {type} name
 * @returns {requestCreateReportFields.reports-actionsAnonym$7}
 */
export function createReportFields(name,qry, options){
    return {
        type: CREATE_RPT_REQUEST_FIELDS,
        name: name,
        qry: qry,
        options: options
    };
}


export function notifyReceiveReportFieldsFailure(){
    
}

/**
 * Receive report details/info.
 * 
 * @returns {undefined}
 */
export function receiveReport(reportId, reportInfo){
    return {
        type: RECEIVE_REPORT,
        reportId: reportId,
        reportInfo: reportInfo
    };
}

//Get details for a single report
export function getReportInfo(reportId){
    return (dispatch, getState) => {
        dispatch(requestReport(reportId));
        
        const authToken = getState().session.userDetails.token;
        let apiEndPoint = "/api/reports/" + reportId;
        
        axios.get(apiEndPoint,{
            headers: { "Authorization": authToken }
        })
        .then(response => {
            return dispatch(receiveReport(reportId, response.data));
        })
        .catch(function(error){
            if(typeof error.response === 'undefined'){
                return dispatch(createReportPreviewError(error.toString()));
            }else{
                return dispatch(createReportPreviewError(error.response.data));
            }
        });
    }
}

export function getReportFields(reportId){
    return (dispatch, getState) => {
        dispatch(requestReportFields(reportId));
        
        const authToken = getState().session.userDetails.token;
        let apiEndPoint = "/api/reports/fields/" + reportId;
        
        axios.get(apiEndPoint,{
            headers: { "Authorization": authToken }
        })
        .then(response => {
            return dispatch(receiveReportFields(reportId, response.data));
        })
        .catch(function(error){
//            return dispatch(notifyReceiveReportFieldsFailure(reportId, "Failed to get report fields"));
        });
    }
}

export function getReports(){
    return (dispatch, getState) => {
        dispatch(requestReports());
        
        const authToken = getState().session.userDetails.token;
        let apiEndPoint = "/api/reports/";
        
        axios.get(apiEndPoint,{
            headers: { "Authorization": authToken }
        })
        .then(response => {
            return dispatch(receiveReports(response.data));
        })
        .catch(function(error){
            return dispatch(notifyReportRequestError("Failed to fetch reports"));
        });
        
    }
}

export function downloadReport(reportId){
    return(dispatch, getState) => {
        
        const authToken = getState().session.userDetails.token;
        let apiEndPoint = "/api/reports/download/" + reportId;
        
        axios.get(apiEndPoint,{
            headers: { "Authorization": authToken }
        })
        .then(response => {
            //Update state to show that 
            return dispatch(receiveDownloadStatus(reportId, response.data));
        })
        .catch(function(error){
//            return dispatch(notifyReportRequestError("Failed to fetch reports"));
        });
    }
}

export function receiveDownloadStatus(reportId, statusData){
    return{
      type: RECEIVE_DOWNLOAD_STATUS,
      statusData: statusData,
      reportId: reportId
    };
}

export function checkDownloadStatus(reportId, statusUrl){
    return(dispatch, getState) => {
        const authToken = getState().session.userDetails.token;
        let apiEndPoint = statusUrl ;
        
        axios.get(apiEndPoint,{
            headers: { "Authorization": authToken }
        })
        .then(response => {
            return dispatch(setDownloadStatus(reportId, response.data['status'], response.data['log']));
        })
        .catch(function(error){
//            return dispatch(notifyReportRequestError("Failed to fetch reports"));
        });
    }
}

export function setDownloadStatus(reportId, status, log){
    return {
        type: SET_DOWNLOAD_STATUS,
        status: status,
        reportId: reportId,
        log: log
    }
}

export function clearReportDownloadStatus(reportId){
    return {
        type: CLEAR_DOWNLOAD_STATUS,
        reportId: reportId
    }
}

/**
 * Request report details 
 * 
 * @param {type} reportId
 * @returns {undefined}
 */
export function getReport(reportId){
    return (dispatch, getState) => {
        
    }
}

export function notifyReportCategoryCreationError(error){
    return {
        type: NOTIFY_REPORT_CATEGORY_CREATION_ERROR,
        error: error
    }
}

//@TODO: Refactor code and combine adding and renameing/editting report 
/**
 * Add a category
 * 
 * @param {type} catName Category nam e
 * @param {type} catNotes Notes about the category
 * @returns {undefined}
 */
export function saveCategory(catName, catNotes){
    return(dispatch, getState) => {
        dispatch(sendCreateReportCategoryRequest());
        
        const authToken = getState().session.userDetails.token;
        let apiEndPoint = '/api/reports/categories' ;
        
        let data = {
            name: catName,
            notes: catNotes
        }
        
        axios.post(apiEndPoint,data, {
            headers: { "Authorization": authToken }
        })
        .then(response => {
            //Refresh the report tree
            dispatch(getReports());
            
            return dispatch(confirmReportCategoryCreation(response.data));
        })
        .catch(function(error){

            if(typeof error.response === 'undefined'){
                return dispatch(notifyReportCategoryCreationError(error.toString()));
            }else{
                return dispatch(notifyReportCategoryCreationError(error.response.data));
            }
        });
    }
}


export function sendDeleteCategoryRequest(){
    return {
        type: SEND_DELETE_RPT_CATEGORY_REQ
    }
}

export function confirmReportCategoryDeletion(){
    return {
        type: CONFIRM_RPT_CATEGORY_DELETION
    }
}

/**
 * Remove a category
 * 
 * @returns {Function}* 
 */
export function removeCategory(catId){
    return(dispatch, getState) => {
        dispatch(sendDeleteCategoryRequest());
        
        const authToken = getState().session.userDetails.token;
        let apiEndPoint = '/api/reports/categories/' + catId ;
        
        axios.delete(apiEndPoint, {
            headers: { "Authorization": authToken }
        })
        .then(response => {
            //Refresh the report tree
            dispatch(getReports());
            
            return dispatch(confirmReportCategoryDeletion(response.data));
        })
        .catch(function(error){

            if(typeof error.response === 'undefined'){
                return dispatch(notifyReportCategoryCreationError(error.toString()));
            }else{
                return dispatch(notifyReportCategoryCreationError(error.response.data));
            }
        });
    }
}

/**
 * This marks the beginning of the report category details request
 * 
 * @param {type} categoryId
 * @returns {requestReportCategory.reports-actionsAnonym$39}
 */
export function requestReportCategory(categoryId){
    return {
        type: REQUEST_REPORT_CATEGORY,
        categoryId: categoryId
    }
}

/**
 * Confirm that the report category details have been received from the api call
 * 
 * @param {type} categoryId
 * @param {type} data
 * @returns {confirmReportCategoryReceived.reports-actionsAnonym$40}
 */
export function confirmReportCategoryReceived(categoryId, data){
    return {
        type: CONFIRM_REPORT_CATEGORY_RECEIVED,
        categoryId: categoryId,
        data: data
    }
}

/**
 * Get report category details 
 * 
 * @param {type} categoryId
 * @returns {Function}
 */
export function getCategory(categoryId){
    return(dispatch, getState) => {
        dispatch(requestReportCategory(categoryId))
        
        const authToken = getState().session.userDetails.token;
        let apiEndPoint = '/api/reports/categories/' + categoryId ;
        
        axios.get(apiEndPoint,{
            headers: { "Authorization": authToken }
        })
        .then(response => {
            return dispatch(confirmReportCategoryReceived(categoryId, response.data));
        })
        .catch(function(error){
            if(typeof error.response === 'undefined'){
                return dispatch(notifyReportCategoryCreationError(error.toString()));
            }else{
                return dispatch(notifyReportCategoryCreationError(error.response.data));
            }
        });
        
    }
}

/**
 * Edit/rename reprot category
 * 
 * @param {type} reportId
 * @param {type} name
 * @param {type} notes
 * @returns {undefined}
 */
export function renameReportCategory(categoryId, name, notes){
    return(dispatch, getState) => {
        dispatch(requestReportCategory(categoryId))
        
        const authToken = getState().session.userDetails.token;
        let apiEndPoint = '/api/reports/categories/' + categoryId ;
        
        let data = {
            name: name,
            notes: notes
        }
        
        axios.post(apiEndPoint,data, {
            headers: { "Authorization": authToken }
        })
        .then(response => {
            //Refresh the report tree
            dispatch(getReports());
            
            return dispatch(confirmReportCategoryRenaming());
        })
        .catch(function(error){

            if(typeof error.response === 'undefined'){
                return dispatch(notifyReportCategoryRenameError(categoryId, error.toString()));
            }else{
                return dispatch(notifyReportCategoryRenameError(categoryId, error.response.data));
            }
        });
    }
}