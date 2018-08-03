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
            let value = AGGridFilterModel[col].filter;
            let type = AGGridFilterModel[col].type; //COTAINS|EQUAL
            urlSearchParams.append("columns["+ index+ "][data]", col);
            urlSearchParams.append("columns["+ index+ "][name]", col);
            urlSearchParams.append("columns["+ index+ "][searchable]", true);
            urlSearchParams.append("columns["+ index+ "][orderable]", true);
            urlSearchParams.append("columns["+ index+ "][search][value]", value);
            
            urlSearchParams.append("columns["+ index+ "][search][regex]", false);
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