import React from 'react';
import { connect } from 'react-redux';
import {AgGridReact} from 'ag-grid-react';

function numberComporator(num1, num2){
    let number1 = parseFloat(num1)
    let number2 = parseFloat(num2)
    if (number1 === null && number2 === null) {
        return 0;
    }
    if (number1 === null) {
        return -1;
    }
    if (number2 === null) {
        return 1;
    }
    
    return number1-number2;

}

class SiteStatsTable extends React.Component{
    constructor(props){
        super(props);

        this.updateColumnDefs = this.updateColumnDefs.bind(this)
        this.getErlangColor = this.getErlangColor.bind(this)
        this.columnDefs = []
        

    }
    
    getErlangColor(value){
        for(let r in this.props.range_colors){
            const color = this.props.range_colors[r]
            if(value >= color.min && value <= color.max){
                return {color: 'white', backgroundColor: color.color}; 
            }
        }
        return null
    }
    
    /**
     * 
     * Update column definitions
     */
    updateColumnDefs(){
        let fields = []
        let that = this
        
        if(this.props.data.length === 0 ) return
        
        for(let k in this.props.data[0]){
            let header = k.toUpperCase()
            
            //Skip latitude and longitude
            if(k === 'latitude' || k === 'longitude') continue
            
            if(k === 'utilization') header += '(%)'
            if(k === 'hr_rate_traffic') header = header + '(%)'
            
            let colDef = {headerName: header, field: k,  filter: "agTextColumnFilter"}
            
            //Set comparator
            if(k === 'utilization' || k === 'hr_rate_traffic' || k === 'voice_erlang_capacity') { 
                colDef['comparator'] = numberComporator
                colDef['filter'] = 'agNumberColumnFilter'
            }
            
            if(k==='voice_erlang_capacity'){
                colDef['cellStyle'] = function(params){
                    return that.getErlangColor(params.value)
                }
            }
            fields.push(colDef)
        }
        
        this.columnDefs = fields
    }
    
    render(){
        this.updateColumnDefs()
        
        const height = this.props.panelHeight - 30
        
        return (<div>
                    <div
                    className="ag-theme-balham p-1"
                    style={{width: '100%', height: height + "px"}}
                >
                    <AgGridReact
                        enableColResize={true}
                        gridAutoHeight={true}
                        columnDefs={this.columnDefs}
                        enableFilter={true}
                        enableSorting={true}
                        rowData={this.props.data}>
                    </AgGridReact>
                </div>             
        </div>)
    }
}


export default connect()(SiteStatsTable);