import React from 'react';
import Plot from 'react-plotly.js';

export default class CellViewPerformance extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        const height = this.props.panelHeight - 35
        return (<div>
            <Plot
                data={[
                  {
                    x: [1, 2, 3],
                    y: [2, 6, 3],
                    type: 'scatter',
                    mode: 'lines+points',
                    marker: {color: 'red'},
                  },
                  {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                ]} 
                useResizeHandler={true} 
                layout={{autosize: true, title: 'A Fancy Plot'}} 
                style={{width: "100%", height: height + "px"}}
              /> 

            </div>)
    }
}