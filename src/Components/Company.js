import React, { Component } from 'react';
import Axios from 'axios'

let api_key = "9W5UPEGYZVUVW53C"

class Company extends Component {
    
    state = {
        Symbol: '',
        Interval: '5min',
        load: false,
        data: []
    }

    componentDidMount = () => {
        let dataCopy = []
        let index = 0
        Axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.props.match.params.companySymbol}&interval=${this.state.Interval}&apikey=${api_key}`)
        .then(response => {
          console.log(response.data[`Time Series (${this.state.Interval})`])
          for(var key in response.data[`Time Series (${this.state.Interval})`])
          {
              dataCopy[index] = response.data[`Time Series (${this.state.Interval})`][key]['4. close']
              index++
          }
          this.setState({
                Symbol: response.data['Meta Data']['2. Symbol'],
                load: true,
                data: dataCopy
            })
          })
        }

    displayData = () => {
        return (
            <div>
                {this.state.Symbol}: {this.state.data[0]}
                {console.log(this.state.data)}
            </div>
        )
    }

    render() {
        return (
            <div>
                {console.log(this.props)}
                {console.log(this.props.match.params.companySymbol)}
                {this.state.load? (this.displayData()) : ('')}
            </div>
        );
    }
}

export default Company;