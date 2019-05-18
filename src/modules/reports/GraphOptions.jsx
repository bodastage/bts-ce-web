import React from 'react';
import { Button, Label, HTMLSelect, FormGroup, Intent, Icon, Collapse } from "@blueprintjs/core";
import { SketchPicker } from 'react-color';
import './GraphOptions.css';

//Show Bar chart options
class BarOptions extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            fields: this.props.fields || [],
            options: this.props.options || [],
            isMarkerOptionsOpen: false
        }
    }
    
    //Update x field
    updateXField(event){
        const value = event.target.value;
        
        //@TODO: Is this necessary
        this.setState({xField: value});
        
        let options = this.state.options;
        options.xField = value;
        
        this.props.updateOptions(options, this.props.traceIndex);
    }
    
    //Update y field
    updateYField(event){
        const value = event.target.value;
        
        //@TODO: Is this necessary
        this.setState({yField: value});
        
        let options = this.state.options;
        options.yField = value;
        
        this.props.updateOptions(options, this.props.traceIndex);
    }
    
    
    //Delete the bar trace options
    deleteTrace(){
        this.props.deleteTrace(this.props.traceIndex);
    }
    
    render(){
        return (
            <div >
                <div className="mb-1">
                    <Icon icon="timeline-bar-chart" />
                    <Icon icon="small-cross" intent={Intent.DANGER} className="float-right" onClick={this.deleteTrace.bind(this)}/>
                </div>
                <FormGroup 
                    label="X"
                    inline={true}
                >
                    <HTMLSelect options={this.state.fields} onChange={this.updateXField.bind(this)} value={this.state.options.xField}></HTMLSelect>
                </FormGroup>

                <Label className={"bp3-inline"}>
                    Y
                    <HTMLSelect options={this.state.fields} onChange={this.updateYField.bind(this)} value={this.state.options.yField}></HTMLSelect>
                </Label>
            </div>
        );
    }
}

//Show Scatter chart options
class ScatterPlotOptions extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            fields: this.props.fields || [],
            options: this.props.options || []
        };
        
        this.modes = ["lines+markers", "lines", "markers","text", "lines+markers+text", "none"];
        
        this.fills = ["none", "tozeroy", "tozerox", "tonexty", "tonextx", "toself"];
    }
    
    //Update x field
    updateXField(event){
        const value = event.target.value;
        
        //@TODO: Is this necessary
        this.setState({xField: value});
        
        let options = this.state.options;
        options.xField = value;
        
        this.props.updateOptions(options, this.props.traceIndex);
    }
    
    //Update y field
    updateYField(event){
        const value = event.target.value;
        
        //@TODO: Is this necessary
        this.setState({yField: value});
        
        let options = this.state.options;
        options.yField = value;
        
        this.props.updateOptions(options, this.props.traceIndex);
    }
    
    updateMode(event){
        const value = event.target.value;
        
        //@TODO: Is this necessary
        if(typeof this.props.options.mode !== 'undefined'){
            this.setState({mode: value});            
        }

        
        let options = this.state.options;
        options.mode = value;
        
        this.props.updateOptions(options, this.props.traceIndex);
    }
    
    updateFill(event){
        const value = event.target.value;
        
        //@TODO: Is this necessary
        if(typeof this.props.options.fill !== 'undefined'){
            this.setState({fill: value});            
        }

        
        let options = this.state.options;
        options.fill = value;
        
        this.props.updateOptions(options, this.props.traceIndex);
    }
    
    //Delete the bar trace options
    deleteTrace(){
        this.props.deleteTrace(this.props.traceIndex);
    }
    
    /**
    * Update the line.color values
    */
    updateLineColor(event){
        const value = event.target.value;
            
        let options = this.state.options;
        options.line = {...options.line, color: value};
        
        this.props.updateOptions(options, this.props.traceIndex);
    }
    
    /**
    * Update the marker.color values
    */
    updateMarkerColor(event){
        const value = event.target.value;
            
        let options = this.state.options;
        options.marker = {...options.marker, color: value};
        
        this.props.updateOptions(options, this.props.traceIndex);
    }
    
    render(){
        
        let defaultLineColor = typeof this.props.options.line !== 'undefined' ? 
            this.props.options.line.color : '#fff'; 
        
        let defaultMarkerColor = typeof this.props.options.marker !== 'undefined' ? 
            this.props.options.marker.color : '#fff'; 
        
        return (
            <div className="container">
                <div className="mb-1">
                    <Icon icon="scatter-plot" />
                    <Icon icon="small-cross" intent={Intent.DANGER} className="float-right" onClick={this.deleteTrace.bind(this)}/>
                </div>
                
                <div className="row">
                
                    <div className="col-sm-6">
                        <FormGroup 
                            label="X"
                            inline={true}
                        >
                            <HTMLSelect options={this.state.fields} onChange={this.updateXField.bind(this)} value={this.state.options.xField}></HTMLSelect>
                        </FormGroup>                
                    </div>
                
                    <div className="col-sm-6">
                        <Label className={"bp3-inline"}>
                            Y
                            <HTMLSelect options={this.state.fields} onChange={this.updateYField.bind(this)} value={this.state.options.yField}></HTMLSelect>
                        </Label>
                    </div>

                </div>



                <Label className={"bp3-inline"}>
                    Mode
                    <HTMLSelect options={this.modes} onChange={this.updateMode.bind(this)} value={this.state.options.mode}></HTMLSelect>
                </Label>
                
                <Label className={"bp3-inline"}>
                    Fill
                    <HTMLSelect options={this.fills} onChange={this.updateFill.bind(this)} value={this.state.options.fill}></HTMLSelect>
                </Label>
                
                
                <div className="row">
                    <div className="col-sm option-section">
                        <span>Line <Icon icon="add"/></span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <Label className={"bp3-inline"}>
                        Color &nbsp;
                        <input type="color" onChange={this.updateLineColor.bind(this)} value={defaultLineColor}/>
                        </Label>
                    </div>
                    <div className="col-sm-6">
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-sm option-section">
                        {this.state.isMarkerOptionsOpen === false ? 
                            <span>Marker <Icon icon="add" onClick={()=>this.setState({isMarkerOptionsOpen:true})}/></span> :
                            <span>Marker <Icon icon="ban-circle" onClick={()=>this.setState({isMarkerOptionsOpen:false})}/></span>
                        }
                    </div>
                </div>
                
                <Collapse isOpen={this.state.isMarkerOptionsOpen}>
                <div className="row">
                
                    <div className="col-sm-6">
                        <Label className={"bp3-inline"}>
                            Color &nbsp;
                        <input type="color" onChange={this.updateMarkerColor.bind(this)} value={defaultMarkerColor}/>
                        </Label>
                    </div>
                
                </div>
                </Collapse>
                
            </div>
        );
    }
}

//Show Pie chart options
class PieChartOptions extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            fields: this.props.fields || [],
            options: this.props.options || []
        }
    }
    
    //Update labels field
    updateLabelsField(event){
        const value = event.target.value;
        
        //@TODO: Is this necessary
        this.setState({labelsField: value});
        
        let options = this.state.options;
        options.labelsField = value;
        
        this.props.updateOptions(options, this.props.traceIndex);
    }
    
    //Update values field
    updateValuesField(event){
        const value = event.target.value;
        
        //@TODO: Is this necessary
        this.setState({valuesField: value});
        
        let options = this.state.options;
        options.valuesField = value;
        
        this.props.updateOptions(options, this.props.traceIndex);
    }
    
    
    //Delete the pie trace options
    deleteTrace(){
        this.props.deleteTrace(this.props.traceIndex);
    }
    
    render(){
        return (
            <div >
                <div className="mb-1">
                    <Icon icon="pie-chart" />&nbsp;&nbsp;
                    <Icon icon="small-cross" intent={Intent.DANGER} className="float-right" onClick={this.deleteTrace.bind(this)}/>
                </div>
                <FormGroup 
                    label="Labels"
                    inline={true}
                >
                    <HTMLSelect options={this.state.fields} onChange={this.updateLabelsField.bind(this)} value={this.state.options.labelsField}></HTMLSelect>
                </FormGroup>

                <Label className={"bp3-inline"}>
                    Values
                    <HTMLSelect options={this.state.fields} onChange={this.updateValuesField.bind(this)} value={this.state.options.valuesField}></HTMLSelect>
                </Label>
            </div>
        );
    }
}


export class GraphOptionsContainer extends React.Component{
    constructor(props){
        super(props);
        
        this.updateGraphOptions = this.updateGraphOptions.bind(this);
        
        this.state = {
            options: this.props.plotOptions || {}
        }
    }
    
    updateGraphOptions(){
    
    }
    
    //Update trace options
    updateOptions(newTraceOptions, traceIndex){
        
        let plotOptions = this.props.plotOptions;
        plotOptions[traceIndex] = newTraceOptions;
        
        this.props.updateGraphOptions(plotOptions);
    }
    
    handleDelete(traceIndex){
        let plotOptions = this.props.plotOptions;
        delete plotOptions[traceIndex];
        this.props.updateGraphOptions(plotOptions);
    }
    render(){
        let options = [];
        
        if(typeof this.props.plotOptions !== 'undefined'){
            options = this.props.plotOptions.map( (entry, idx) => {
                if(entry.type === 'bar'){
                    return <div className="card p-2 mt-1" key={idx}><BarOptions traceIndex={idx} fields={this.props.fields || []} trace={entry} options={this.state.options[idx]} updateOptions={this.updateOptions.bind(this)} deleteTrace={this.handleDelete.bind(this)}/></div>
                }

                if(entry.type === 'pie'){
                    return <div className="card p-2 mt-1" key={idx}><PieChartOptions traceIndex={idx} fields={this.props.fields || []} trace={entry} options={this.state.options[idx]} updateOptions={this.updateOptions.bind(this)} deleteTrace={this.handleDelete.bind(this)}/></div>
                }

                if(entry.type === 'scatter'){
                    return <div className="card p-2 mt-1" key={idx}><ScatterPlotOptions traceIndex={idx} fields={this.props.fields || []} trace={entry} options={this.state.options[idx]} updateOptions={this.updateOptions.bind(this)} deleteTrace={this.handleDelete.bind(this)}/></div>
                }
                
                return <div key={idx}></div>
            });
        }

        
        return options;
    }
}