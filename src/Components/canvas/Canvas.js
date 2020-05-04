/* App.js */
import CanvasJSReact from './canvasjs.react';
import React, { Component } from 'react';
import NewsCard from '../News/NewsCard'
import Grid from '@material-ui/core/Grid';
import Progress from '../progress/Progress'
import newsData from '../News/newsData.json'

//var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class Canvas extends Component {
 
    state = {
		load: false,
		dataPoints: [],
		news: false,
		newsData: []
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
				xValueFormatString: "DD MMM YY 	HH:mm",
				yValueFormatString: "$#,##0.00",
				dataPoints: this.state.dataPoints
			}]
		}

		const { data } = this.state.newsData;
		return (
		<div>
			<CanvasJSChart options = {options} 
				 onRef={ref => this.chart = ref}
			/>

<Grid  style={{display: "grid"}} container justify="center">
        {
            (this.state.news)
            ? (
                (data.map((el) => {
					if(el.tickers.includes(this.props.companyName)){
                    return <NewsCard
                    title={el.title}
                    image={el.image_url}
                    text={el.text}
                    newsUrl={el.news_url}
                    stocks={el.tickers}
                    sentiment={el.sentiment}
                    />
					}
                }))
            )
            :(<Progress/>)
        }
        </Grid>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
	
	componentDidMount(){
		this.setState({
			news: true,
			newsData: newsData,
		  });
        var chart = this.chart
        let dateStr = this.props.date[0]
        var date = dateStr.slice(0,10)
        for (var i = 0; i < this.props.date.length; i++) {
            if(date === this.props.date[i].slice(0,10))
            this.state.dataPoints.push({
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