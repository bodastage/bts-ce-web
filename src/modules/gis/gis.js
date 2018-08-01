import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    
    render(){
        const position = [this.state.lat, this.state.lng]
        
        return (
        <div>
            <h3><FontAwesomeIcon icon="globe-africa"/> GIS</h3>

            <div className="card">
                <div className="card-body p-3">
                    
                    <Map center={position} zoom={this.state.zoom}>
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
        );
    }
}

export default connect()(GIS);