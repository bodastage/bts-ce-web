import React from 'react'
import { Map, TileLayer, Marker, Popup, SemiCircle } from 'react-leaflet';
import L from 'leaflet';
import  'leaflet-semicircle'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'leaflet/dist/leaflet.css';
import { ResizeSensor } from "@blueprintjs/core";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class CellViewGIS extends React.Component{
    static icon = "globe-africa";
    static label = "GIS";
    constructor(props){
        super(props);
        this.state = {
            lat: this.props.latitude,
            lng: this.props.longitude,
            azimuth: this.props.azimuth,
            zoom: 13,
            addedToMap: false
        }
        
        this.handleResize = this.handleResize.bind(this);
        
        this.refId = "map_" + props.cellId
        
    }
   
    componentDidMount () {
        const map = this.refs[this.refId].leafletElement;
        
        //By the time the GIS tab is shown, the GIS component has already
        //been mounted. As a result, leaflet does not display correctly because
        //it cannot determine the height value of an HTML element with 
        //display:none. This re-renders the map correctly after the tab is shown.
        setTimeout(function(){
            map.invalidateSize();
        },1000);
        
    }
    
    componentDidUpdate(){
        const map = this.refs[this.refId].leafletElement;
        map.invalidateSize();
        
        
        let servingCell = L.semiCircle([this.state.lat, this.state.lng], 
                                        {radius: 1000, color: "#FF5733"}
                                     )
            .setDirection(this.state.azimuth, 45)
     
        if(this.state.addedToMap === false) {
            setTimeout(() => servingCell.addTo(map),600);
            this.setState({addedToMap: true});
        }
        
    }
    
    
    handleResize(resizeEntries){
        this.setState({height: resizeEntries[0].contentRect.height})
        
        const map = this.refs[this.refId].leafletElement;
        setTimeout(function(){
            map.invalidateSize();
        },500);
    }
    
    render(){
        const position = [this.props.latitude, this.props.longitude]
        const height = this.props.mapHeight-10;
         
        return (
                <div className="cellview-map-container" >
                <ResizeSensor onResize={this.handleResize}>
                <Map ref={this.refId} center={position} 
                    attributionControl={false}
                    zoom={this.state.zoom} 
                    style={{height: height + 'px'}}>
                    <TileLayer    
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </Map>
                </ResizeSensor>
                </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    
    if (typeof state.networkbrowser.cells[ownProps.cellId] === 'undefined'){
        return {
            latitude: 51.505,
            longitude: -0.09,
            azimuth: 0,
            relations: []
        };
    }
    
  return {
    latitude: state.networkbrowser.cells[ownProps.cellId]["parameters"].latitude,
    longitude: state.networkbrowser.cells[ownProps.cellId]["parameters"].longitude,
    azimuth: state.networkbrowser.cells[ownProps.cellId]["parameters"].azimuth,
    relations: state.networkbrowser.cells[ownProps.cellId]["relations"]
  };
  
}
export default connect(mapStateToProps)(CellViewGIS);