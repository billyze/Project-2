import React, { Component } from 'react';
import './App.css';
// import { Switch, Route } from 'react-router-dom'
import Axios from 'axios'
import Gif from './components/Gif'
import Navbar from './components/Navbar'

let api_key = "9W5UPEGYZVUVW53C"

class App extends Component {
  
  state = {
    name: '',
    image: [],
    company: {},
    imageExists: false
  }

  componentDidMount = () => {

    Axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=5min&apikey=${api_key}`)
    .then(response => {
      console.log(response)
      this.setState({
        company: {
          name: response.data.Meta_Data
        }
      })
    })
    Axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=AAPL&apikey=${api_key}`)
    .then(response => {
      console.log(response)
      this.setState({
        name: response.data.bestMatches[0]['2. name']
      })
    })
  }


  render() {
    return (
      <div>
      <Navbar/>
        <Gif/>
        {/* {this.state.name} */}
      </div>
    );
  }
}

export default App;