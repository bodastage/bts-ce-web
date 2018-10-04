import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {AgGridReact} from 'ag-grid-react';
import GridLayout , { WidthProvider, Responsive  } from 'react-grid-layout';
import '../../../node_modules/react-grid-layout/css/styles.css'
import '../../../node_modules/react-resizable/css/styles.css'
import './cellView.css';
import CellViewGIS from './CellViewGIS'
import CellViewPerformance from './CellViewPerformance'
import CellViewOptimization from './CellViewOptimization'
import CellViewInfoPanel from './CellViewInfoPanel'
import { Button, Card, Elevation, ResizeSensor } from "@blueprintjs/core";
import { getCellParameters, getCellRelations } from './network-browser-actions'

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class CellView extends React.Component{
    static icon = "rss";
    static label = "Cell View";
    
    constructor(props){
        super(props);
        
        const initPanelHeight = (window.innerHeight - 150)/2 - 30
        this.state = {
            width: 1200,
            rowHeight: (window.innerHeight - 150)/4,
            mapHeight: initPanelHeight,
            pmHeight: initPanelHeight,
            cmHeight: initPanelHeight,
            optHeight: initPanelHeight
            
        }
        
        this.handleResize = this.handleResize.bind(this)
        this.onLayoutChange = this.onLayoutChange.bind(this)
    }
    
    componentDidMount(){
        //Fetch cell parameters
        if(this.props.parameters === null){
            this.props.dispatch(getCellParameters(this.props.options.cellId))
        }
        
        //Fetch cell relations
        if(this.props.relations === null){
            this.props.dispatch(getCellRelations(this.props.options.cellId))
        }
    }
    
    handleResize(resizeEntries){
        this.setState({width: resizeEntries[0].contentRect.width})
    }
    
    onLayoutChange(layout){
        
        const layoutH = layout[0].h;
        const rowHeight = this.state.rowHeight;
        const mapHeight = rowHeight * layoutH - 30;
        const pmHeight  = rowHeight * layout[2].h
        const cmPanelHeight  = rowHeight * layout[1].h
        const optHeight  = rowHeight * layout[3].h
        this.setState(
            {
                mapHeight: mapHeight,
                pmHeight: pmHeight,
                cmHeight: cmPanelHeight,
                optHeight: optHeight
            })
    }
    
    render(){
        
        const height = window.innerHeight - 150;
        const rowHeight = height/4
        
        // layout is an array of objects, see the demo for more complete usage
        var layout = [
          {i: 'a', x: 0, y: 0, w: 1, h: 2},
          {i: 'b', x: 1, y: 0, w: 1, h: 2},
          {i: 'c', x: 4, y: 0, w: 1, h: 2},
          {i: 'd', x: 0, y: 0, w: 1, h: 2}
        ];
        return (
        <div className="cell-view">
           <h3><FontAwesomeIcon icon="rss"/> {this.props.options.title}</h3>
           <div><ResizeSensor onResize={this.handleResize}>
            <GridLayout className="layout" 
                onLayoutChange={this.onLayoutChange}
              draggableHandle=".card-header"
              layout={layout} 
              cols={2} 
              margin={[5,5]}
              rowHeight={this.state.rowHeight} width={this.state.width}>
              <div key="a" className="rgl-border">
                  <div className="card">
                    <div className="card-header">
                      GIS
                    </div>
                    <CellViewGIS mapHeight={this.state.mapHeight} cellId={this.props.options.cellId}></CellViewGIS>
                  </div>

              </div>
              <div key="b" className="rgl-border">
                  <CellViewInfoPanel cellId={this.props.options.cellId} panelHeight={this.state.cmHeight}/>
              </div>
              <div key="c" className="rgl-border">
                  <div className="card">
                    <div className="card-header">
                      Performance
                    </div>
                    <CellViewPerformance panelHeight={this.state.pmHeight}/>
                  </div>    
              </div>
              <div key="d" className="rgl-border">
                  <div className="card">
                    <div className="card-header">
                      Optimzation
                    </div>
                    <CellViewOptimization panelHeight={this.state.optHeight}/>
                  </div>
              </div>
            </GridLayout>
          </ResizeSensor></div>
        </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    if (typeof state.networkbrowser.cells[ownProps.options.cellId] === 'undefined'){
        return {
            parameters: null,
            relations: null
        };
    }
    
  return {
    parameters: state.networkbrowser.cells[ownProps.options.cellId]["parameters"],
    relations: state.networkbrowser.cells[ownProps.options.cellId]["relations"]
  };
}

export default connect(mapStateToProps)(CellView);