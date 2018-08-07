import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'leaflet/dist/leaflet.css';
import './gis.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class GIS extends React.Component{
    static icon = "globe-africa";
    static label = "GIS";
    constructor(props){
        super(props);
        this.state = {
            lat: 51.505,
            lng: -0.09,
            zoom: 13
        }
    }
   
    componentDidMount () {
        console.log('React-leaflet componentDidMount');
        const map = this.refs.map.leafletElement;
        
        //By the time the GIS tab is shown, the GIS component has already
        //been mounted. As a result, leaflet does not display correctly because
        //it cannot determine the height value of an HTML element with 
        //display:none. This re-renders the map correctly after the tab is shown.
        setTimeout(function(){
            map.invalidateSize();
        },1000);
        
//        window.dispatchEvent(new Event('resize'));
//        
//        this.forceUpdate();
    }
    
    componentDidUpdate(){
        const map = this.refs.map.leafletElement;
        map.invalidateSize();
    }
    
    render(){
        const position = [this.state.lat, this.state.lng]
        const height = window.innerHeight - 150;
        
        return (
        <div>
            <h3><FontAwesomeIcon icon="globe-africa"/> GIS</h3>

            <div className="card">
                <div className="card-body p-2" >
                    <div className="map-container" >
                    <Map ref='map' center={position} zoom={this.state.zoom} style={{height: height + 'px'}}>
                        <TileLayer
                          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                          <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                          </Popup>
                        </Marker>
                    </Map>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default connect()(GIS);