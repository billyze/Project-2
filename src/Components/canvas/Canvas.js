/* App.js */
import CanvasJSReact from './canvasjs.react';
import React, { Component } from 'react';
import News from './../News/News';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
var dataPoints =[];
class Canvas extends Component {
 
    state = {
        load: false
    }

	render() {	
        console.log(this.props)
		const options = {
			theme: "light2",
			title: {
				text: `Stock Price of ${this.props.companyName}`
			},
			axisY: {
				title: "Price in USD",
				prefix: "$",
				includeZero: false
			},
			data: [{
				type: "line",
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,##0.00",
				dataPoints: dataPoints
			}]
        }
        console.log(dataPoints)
		return (
		<div>
			<CanvasJSChart options = {options} 
				 onRef={ref => this.chart = ref}
			/>
			<News/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
	
	componentDidMount(){
        var chart = this.chart
        let dateStr = this.props.date[0]
        var date = dateStr.slice(0,10)
        for (var i = 0; i < this.props.date.length; i++) {
            if(date === this.props.date[i].slice(0,10))
            dataPoints.push({
                x: new Date(this.props.date[i]),
                y: Number(this.props.data[i])
                // x: new Date(data[i].x),
                // y: data[i].y
            });
        }
        chart.render();
		// fetch('https://canvasjs.com/data/gallery/react/nifty-stock-price.json')
		// .then(function(response) {
		// 	return response.json();
		// })
		// .then(function(data) {
		// 	for (var i = 0; i < data.length; i++) {
		// 		dataPoints.push({
        //             // x: this.props.date[i],
        //             // y: this.props.data[i]
		// 			x: new Date(data[i].x),
		// 			y: data[i].y
		// 		});
        //     }
        //     chart.render();
		// });
	}
}

export default Canvas;