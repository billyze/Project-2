/* App.js */
import CanvasJSReact from './canvasjs.react';
import React, { Component } from 'react';
import NewsCard from '../News/NewsCard';
import Grid from '@material-ui/core/Grid';
import Progress from '../progress/Progress';
import newsData from '../News/newsData.json';
import Axios from 'axios';
//var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

let api_key = '9W5UPEGYZVUVW53C';

class Canvas extends Component {
  state = {
    load: false,
    dataPoints: [],
    news: false,
    newsData: [],
    date: [],
    data: [],
    symbol: '',
    intervalSetting: {
      fiveMin: {
        intervalIncluded: '&interval=',
        interval: '5min',
        xValueFormatString: 'DD MMM YY 	HH:mm',
        type: 'INTRADAY',
        typeLower: '5min',
      },
      fifteenMin: {
        intervalIncluded: '&interval=',
        interval: '15min',
        xValueFormatString: 'DD MMM YY 	HH:mm',
        type: 'INTRADAY',
        typeLower: '15min',
      },
      thirtyMin: {
        intervalIncluded: '&interval=',
        interval: '30min',
        xValueFormatString: 'DD MMM YY 	HH:mm',
        type: 'INTRADAY',
        typeLower: '30min',
      },
      sixtyMin: {
        intervalIncluded: '&interval=',
        interval: '60min',
        xValueFormatString: 'DD MMM YY 	HH:mm',
        type: 'INTRADAY',
        typeLower: '60min',
      },
      daily: {
        intervalIncluded: '',
        interval: '',
        xValueFormatString: 'DD MMM YY',
        type: 'DAILY',
        typeLower: 'Daily',
      },
      weekly: {
        intervalIncluded: '',
        interval: '',
        xValueFormatString: 'MMM YY',
        type: 'WEEKLY',
        typeLower: 'Weekly',
      },
    },
    currentInterval: 'fiveMin',
  };

  render() {
    const options = {
      theme: 'light2',
      title: {
        text: `Stock Price of ${this.props.companyName}`,
      },
      axisY: {
        title: 'Price in USD',
        prefix: '$',
        includeZero: false,
      },
      data: [
        {
          type: 'line',
          xValueFormatString: this.state.intervalSetting[
            this.state.currentInterval
          ].xValueFormatString,
          yValueFormatString: '$#,##0.00',
          dataPoints: this.state.dataPoints,
        },
      ],
    };

    const { data } = this.state.newsData;
    console.log(this.state.dataPoints);
    return (
      <div  style={{ margin: '10px' }}>
        {this.state.load ? this.loadCanvas() : ''}
        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
        {(this.state.dataPoints = [])}
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ margin: '10px' }}>Set interval:</h4>
          <select
            style={{ marginLeft: '20px' }}
            id="intervals"
            onChange={(e) => this.newInterval(e.target.value)}
          >
            <option value="fiveMin">5 Min</option>
            <option value="sixtyMin">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <h2>
          <i>Latest News on {this.props.companyName}</i>
        </h2>
        <Grid style={{ display: 'grid' }} container justify="center">
          {this.state.news ? (
            data.map((el) => {
              if (el.tickers.includes(this.props.companyName)) {
                return (
                  <NewsCard
                    title={el.title}
                    image={el.image_url}
                    text={el.text}
                    newsUrl={el.news_url}
                    stocks={el.tickers}
                    sentiment={el.sentiment}
                  />
                );
              }
            })
          ) : (
            <Progress />
          )}
        </Grid>
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      news: true,
      newsData: newsData,
    });
    let dataCopy = [];
    let dateCopy = [];
    let index = 0;
    Axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${
        this.props.companyName
      }${
        this.state.intervalSetting[this.state.currentInterval].intervalIncluded
      }${
        this.state.intervalSetting[this.state.currentInterval].interval
      }&apikey=${api_key}`
    ).then((response) => {
      for (var key in response.data[
        `Time Series (${
          this.state.intervalSetting[this.state.currentInterval].interval
        })`
      ]) {
        dateCopy[index] = key;
        dataCopy[index] =
          response.data[
            `Time Series (${
              this.state.intervalSetting[this.state.currentInterval].interval
            })`
          ][key]['4. close'];
        index++;
      }
      this.setState({
        Symbol: response.data['Meta Data']['2. Symbol'],
        load: true,
        data: dataCopy,
        date: dateCopy,
      });
    });
  }

  loadCanvas() {
    var chart = this.chart;
    let dateStr = this.state.date[0];
    var date = dateStr.slice(0, 10);
    for (var i = 0; i < this.state.date.length; i++) {
      if (['daily', 'weekly'].includes(this.state.currentInterval)) {
        this.state.dataPoints.push({
          x: new Date(this.state.date[i]),
          y: Number(this.state.data[i]),
        });
      } else {
        if (date === this.state.date[i].slice(0, 10))
          this.state.dataPoints.push({
            x: new Date(this.state.date[i]),
            y: Number(this.state.data[i]),
          });
      }
    }
    chart.render();
  }

  newInterval(value) {
    let dataCopy = [];
    let dateCopy = [];
    let index = 0;
    Axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_${this.state.intervalSetting[value].type}&symbol=${this.props.companyName}${this.state.intervalSetting[value].intervalIncluded}${this.state.intervalSetting[value].interval}&apikey=${api_key}`
    ).then((response) => {
      if (value === 'weekly') {
        for (var key in response.data[
          `${this.state.intervalSetting[value].typeLower} Time Series`
        ]) {
          dateCopy[index] = key;
          dataCopy[index] =
            response.data[
              `${this.state.intervalSetting[value].typeLower} Time Series`
            ][key]['4. close'];
          index++;
        }
      } else {
        for ( key in response.data[
          `Time Series (${this.state.intervalSetting[value].typeLower})`
        ]) {
          dateCopy[index] = key;
          dataCopy[index] =
            response.data[
              `Time Series (${this.state.intervalSetting[value].typeLower})`
            ][key]['4. close'];
          index++;
        }
      }
      this.setState({
        Symbol: response.data['Meta Data']['2. Symbol'],
        load: true,
        data: dataCopy,
        date: dateCopy,
        currentInterval: value,
      });
    });
  }
}

export default Canvas;
