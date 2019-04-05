import React from 'react';
import { Button, Label, HTMLSelect, FormGroup, Intent } from "@blueprintjs/core";

//Show Bar chart options
class BarOptions extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            fields: this.props.fields || [],
            options: this.props.options || []
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
    
    
    render(){
        return (
            <div >
                <Button icon="small-cross" text="Remove" intent={Intent.DANGER}/>
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
    
    render(){
        let options = [];
        
        if(typeof this.props.plotOptions !== 'undefined'){
            options = this.props.plotOptions.map( (entry, idx) => {
                if(entry.type === 'bar'){
                    return <div className="card p-2 mt-1" key={idx}><BarOptions traceIndex={idx} fields={this.props.fields || []} trace={entry} options={this.state.options[idx]} updateOptions={this.updateOptions.bind(this)}/></div>
                }

                return <div key={idx}></div>
            });
        }

        
        return options;
    }
}