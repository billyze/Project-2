import React, { Component } from 'react';
// import Axios from 'axios'
import Canvas from '../canvas/Canvas'

// let api_key = "9W5UPEGYZVUVW53C"

class Company extends Component {
    
    state = {
        Symbol: '',
        Interval: '5min',
        load: false,
        data: [],
        date: [],
        currentDate: ''
    }

    componentDidMount = () => {
        // let dataCopy = []
        // let dateCopy = []
        // let index = 0
        // Axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.props.match.params.companySymbol}&interval=${this.state.Interval}&apikey=${api_key}`)
        // .then(response => {
        //   for(var key in response.data[`Time Series (${this.state.Interval})`])
        //   {
        //       dateCopy[index] = key
        //       dataCopy[index] = response.data[`Time Series (${this.state.Interval})`][key]['4. close']
        //       index++
        //   }
        //   this.setState({
        //         Symbol: response.data['Meta Data']['2. Symbol'],
        //         load: true,
        //         data: dataCopy,
        //         date: dateCopy
        //     })
        //   })
        }

    displayData = () => {
        let x = new Date(this.state.date[0])
        console.log(x)
        return (
            <div>
                <Canvas currentDate={this.state.currentDate} data={this.state.data} date={this.state.date} companyName={this.props.match.params.companySymbol} />
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.displayData()}
            </div>
        );
    }
}

export default Company;