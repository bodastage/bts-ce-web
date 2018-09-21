import React from 'react'
import { Map, TileLayer, Marker, CircleMarker, Popup, SemiCircle } from 'react-leaflet';
import L from 'leaflet';
import  'leaflet-semicircle'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'leaflet/dist/leaflet.css';
import { ResizeSensor, Icon } from "@blueprintjs/core";
import SingleSiteGraph from './singleSiteGraph';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class SiteStatsMap extends React.Component{
    static icon = "globe-africa";
    static label = "GIS";
    constructor(props){
        super(props);
        this.state = {
            zoom: 13,
            addedToMap: false
        }
        
        this.handleResize = this.handleResize.bind(this);
        this.getErlangColor = this.getErlangColor.bind(this);
        
        this.color_ranges = this.props.color_ranges
    }
   
    getErlangColor(value){
        for(let r in this.props.range_colors){
            const color = this.props.range_colors[r]
            if(value >= color.min && value <= color.max){
                return color.color 
            }
        }
        return null
    }

    componentDidMount () {
        const map = this.refs.site_stats.leafletElement;
        
        //By the time the GIS tab is shown, the GIS component has already
        //been mounted. As a result, leaflet does not display correctly because
        //it cannot determine the height value of an HTML element with 
        //display:none. This re-renders the map correctly after the tab is shown.
        setTimeout(function(){
            map.invalidateSize();
        },1000);
        
    }
    
    componentDidUpdate(){
        const map = this.refs.site_stats.leafletElement;
        map.invalidateSize();
    }
    
    
    handleResize(resizeEntries){
        this.setState({height: resizeEntries[0].contentRect.height})
        
        const map = this.refs.site_stats.leafletElement;
        setTimeout(function(){
            map.invalidateSize();
        },500);
    }
    
    render(){
        const position = [0.34186,32.57085]
        const height = this.props.panelHeight-30;
        
        let siteMarkers = []
        for (let k in this.props.data){
            const d = this.props.data[k]
            const pos = [ d.latitude, d.longitude ]
            const color = this.getErlangColor(d.voice_erlang_capacity)
            siteMarkers.push(<CircleMarker center={pos} radius={5} color={color} fillColor={color} fill={true} fillOpacity={1} key={k}>
                <Popup maxWidth={560}>
                    <div className="row" style={{width: 500+"px"}}>
                        <div className="col">
                        <Icon icon="cell-tower" style={{color:color}} /> {d.sitename}
                        <table className="bp3-html-table bp3-small bp3-html-table-striped">
                        <tbody>
                            <tr><td>Site ID</td><td>{d.siteid}</td></tr>
                            <tr><td>Utilization</td><td>{d.utilization}%</td></tr>
                            <tr><td>HR Rate Traffic</td><td>{d.hr_rate_traffic}%</td></tr>
                            <tr><td>Voice Erlang Capacity</td><td>{d.voice_erlang_capacity}</td></tr>
                        </tbody>
                        </table>
                        </div > 
                        <div className="col">
                            <SingleSiteGraph/>
                        </div>
                    </div>
                </Popup>    
                </CircleMarker>)
        }
         
        return (
                <div className="cellview-map-container" >
                <ResizeSensor onResize={this.handleResize}>
                <Map ref='site_stats' center={position} 
                    attributionControl={false}
                    zoom={this.state.zoom} 
                    style={{height: height + 'px'}}>
                    <TileLayer    
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {siteMarkers}
                </Map>
                </ResizeSensor>
                </div>
        );
    }
}

export default connect()(SiteStatsMap);