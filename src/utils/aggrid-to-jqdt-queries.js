import 'url-search-params-polyfill';

/**
 * Create a jquery Datatables column filter and sort URL query string to be 
 * used for the AGGrid server side filtering
 * 
 * @param Array columnNames
 * @param Array AGGridSortModel
 * @param Dictionary AGGridFilterModel
 * @param Array AGGridColumns
 * @returns String
 */
export function getQueryForAGGridSortAndFilter(columnNames, AGGridSortModel, AGGridFilterModel, AGGridColumns){
    let urlSearchParams = new URLSearchParams();
    columnNames.forEach(function(col, index){
        if( typeof AGGridFilterModel[col] !== 'undefined' ){
            let filterModel = AGGridFilterModel[col];
            let value = AGGridFilterModel[col].filter;
            console.log(filterModel);
            
            urlSearchParams.append("columns["+ index+ "][data]", col);
            urlSearchParams.append("columns["+ index+ "][name]", col);
            urlSearchParams.append("columns["+ index+ "][searchable]", true);
            urlSearchParams.append("columns["+ index+ "][orderable]", true);
            
            if( typeof filterModel.operator === 'undefined'){
                let filterType = filterModel.type;
                let filterValue= filterModel.filter;
                
                if( filterType === 'contains' ){
                    urlSearchParams.append("columns["+ index+ "][search][value]", filterModel.filter);
                    urlSearchParams.append("columns["+ index+ "][search][regex]", false);                    
                }
                
                if( filterType === 'notEqual' ){
                    urlSearchParams.append("columns["+ index+ "][search][value]", '^(?!'+filterValue + "$)" );
                    urlSearchParams.append("columns["+ index+ "][search][regex]", true);                    
                }
                
                if( filterType === 'equals' ){
                    urlSearchParams.append("columns["+ index+ "][search][value]", '^'+filterValue + "$" );
                    urlSearchParams.append("columns["+ index+ "][search][regex]", true);                    
                }
                
                if( filterType === 'startsWith' ){
                    urlSearchParams.append("columns["+ index+ "][search][value]", '^'+filterValue + ".*" );
                    urlSearchParams.append("columns["+ index+ "][search][regex]", true);                    
                }
                
                if( filterType === 'endsWith' ){
                    urlSearchParams.append("columns["+ index+ "][search][value]", '.*'+filterValue + "$" );
                    urlSearchParams.append("columns["+ index+ "][search][regex]", true);                    
                }
                
                if( filterType === 'notContains' ){
                    urlSearchParams.append("columns["+ index+ "][search][value]", '^((?!'+filterValue + ").)*$" );
                    urlSearchParams.append("columns["+ index+ "][search][regex]", true);                    
                }

            }else{
                let filterOperator = filterModel.operator;
                let condition1 = filterModel.condition1;
                let condition2 = filterModel.condition2;
                let separator = "";
                let filterValue1 = "";
                let filterValue2 = "";
                
                if(condition1.type === 'contains') {
                    filterValue1 = `%${condition1.filter}%`
                }
                if( condition1.type === 'notEqual' ){
                    filterValue1 = '^(?!'+condition1.filter + "$)";                  
                }
                if( condition1.type === 'equals' ){
                    filterValue1 = '^'+condition1.filter + "$";           
                }
                if( condition1.type === 'startsWith' ){
                    filterValue1 = '^'+condition1.filter + ".*";                  
                }
                if( condition1.type === 'endsWith' ){
                    filterValue1 = '.*'+condition1.filter + "$";                 
                }
                if( condition1.type === 'notContains' ){
                    filterValue1 = '^((?!'+condition1.filter + ").)*$";                 
                }
                
                //condition2 filter
                if(condition2.type === 'contains') {
                    filterValue2 = `%${condition2.filter}%`
                }
                if( condition2.type === 'notEqual' ){
                    filterValue2 = '^(?!'+condition2.filter + "$)";                  
                }
                if( condition2.type === 'equals' ){
                    filterValue2 = '^'+condition2.filter + "$";           
                }
                if( condition2.type === 'startsWith' ){
                    filterValue2 = '^'+condition2.filter + ".*";                  
                }
                if( condition2.type === 'endsWith' ){
                    filterValue2 = '.*'+condition2.filter + "$";                 
                }
                if( condition2.type === 'notContains' ){
                    filterValue2 = '^((?!'+condition2.filter + ").)*$";                 
                }
                
                
                if( filterOperator === 'OR'){
                    separator = "|";
                }
                
                let filterValue = "(" + filterValue1 + ")" + separator + "(" + filterValue2 + ")";
                
                urlSearchParams.append("columns["+ index+ "][search][value]", filterValue);
                urlSearchParams.append("columns["+ index+ "][search][regex]", true);

            }
            
            
            
        }else{
            urlSearchParams.append("columns["+ index+ "][data]", col);
            urlSearchParams.append("columns["+ index+ "][name]", col);
            urlSearchParams.append("columns["+ index+ "][searchable]", true);
            urlSearchParams.append("columns["+ index+ "][orderable]", true);
            urlSearchParams.append("columns["+ index+ "][search][value]", "");
            urlSearchParams.append("columns["+ index+ "][search][regex]", false);
        }

    });
    
    if(AGGridSortModel.length > 0 ){
        AGGridSortModel.forEach(function(model, idx){
            let col = model.colId;
            let dir = model.sort;
            let colIdx = columnNames.indexOf(col)
            urlSearchParams.append("order[0][column]", colIdx);
            urlSearchParams.append("order[0][dir]", dir);
        });
    }else{
        urlSearchParams.append("order[0][column]", "0");
        urlSearchParams.append("order[0][dir]", "asc");        
    }

    urlSearchParams.append("search[value]", "");
    urlSearchParams.append("search[regex]", false);
    urlSearchParams.append("draw", 1);

    return urlSearchParams.toString();
}