import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {AgGridReact} from 'ag-grid-react';
import GridLayout , { WidthProvider, Responsive  } from 'react-grid-layout';
import '../../../node_modules/react-grid-layout/css/styles.css'
import '../../../node_modules/react-resizable/css/styles.css'
import './cellView.css';
import CellViewGIS from './cellViewGIS'
import CellViewInfoPanel from './cellViewInfoPanel'
import { Button, Card, Elevation } from "@blueprintjs/core";
 
 
const ResponsiveReactGridLayout = WidthProvider(Responsive);

class CellView extends React.Component{
    static icon = "rss";
    static label = "Cell View";
    
    render(){
        const height = window.innerHeight - 150;
        const rowHeight = height/4
        
        // layout is an array of objects, see the demo for more complete usage
        var layout = [
          {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
          {i: 'b', x: 1, y: 0, w: 1, h: 2},
          {i: 'c', x: 4, y: 0, w: 1, h: 2},
          {i: 'd', x: 0, y: 0, w: 1, h: 2}
        ];
        return (
        <div>
           <h3><FontAwesomeIcon icon="rss"/> {this.props.options.title}</h3>
           
          <GridLayout className="layout" 
            layout={layout} 
            cols={2} 
            margin={[5,5]}
            rowHeight={rowHeight} width={1200}>
            <div key="a" className="rgl-border">
                <CellViewGIS mapHeight={rowHeight*2}></CellViewGIS>
            </div>
            <div key="b" className="rgl-border">
                <CellViewInfoPanel/>
            </div>
            <div key="c" className="rgl-border">c</div>
            <div key="d" className="rgl-border">d</div>
          </GridLayout>
        </div>
        )
    }
}

export default connect()(CellView);