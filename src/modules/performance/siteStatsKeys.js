import React from 'react';
import { connect } from 'react-redux';
import {AgGridReact} from 'ag-grid-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class SiteStatsKeys extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        let rows = []
        for(let r in this.props.range_colors){
            const row = this.props.range_colors[r]
            rows.push(
                <tr key={row.min}>
                    <td><FontAwesomeIcon icon="square" style={{color:row.color}}/></td>
                    <td>{row.min}</td><td>{row.max === 1000000 ? "" : row.max }</td><td>{row.count}</td></tr>)
        }
        
        return (
        <div>
            <table className="bp3-html-table bp3-small site-stats-keys-table">
                <thead>
                <tr><th></th><th>Min</th><th>Max</th><th>Count</th></tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
        )
    }
}