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
            zoom: 13,
            height: window.innerHeight - 150,
            cellId: 'W_0221'
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
        
        L.semiCircle([this.state.lat, this.state.lng], {radius: 1000, color: "#FF5733"})
            .setDirection(90, 45)
            .addTo(map);
    }
    
    handleResize(resizeEntries){
        this.setState({height: resizeEntries[0].contentRect.height})
        
        const map = this.refs[this.refId].leafletElement;
        setTimeout(function(){
            map.invalidateSize();
        },500);
    }
    
    render(){
        const position = [this.state.lat, this.state.lng]
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

function mapStateToProps(state){
    return {
        latitude: 51.505,
        longitude: -0.09
    };
}
export default connect(mapStateToProps)(CellViewGIS);