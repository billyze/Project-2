import React, { Component } from 'react';
import './App.css';
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'
import { Switch, Route } from 'react-router-dom'
import Axios from 'axios'
// import {auth, createUserProfileDocument} from './Components/firebase/firebase.utils'

let api_key = "9W5UPE"

class App extends Component {
  
  state = {
    name: '',
    image: [],
    company: {},
    imageExists: false,
    // currentUser: null
  }

// unsubscribeFromAuth = null;

  componentDidMount = () => {

    // this.unsubscribeFromAuth = auth.onAuthStateChanged(user=>{
    //   this.setState({currentUser: user})

    //   console.log(user)
    // })

    Axios.get("https://cors-anywhere.herokuapp.com/https://random.dog/woof.json")
    .then(response => {
      console.log(response)
      this.setState({image:response.data, imageExists:true})
    })
    Axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=5min&apikey=${api_key}`)
    .then(response => {
      console.log(response.data)
      // this.setState({
      //   company: {
      //     name: response.data.Meta_Data
      //   }
      // })
    })
    Axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=AAPL&apikey=${api_key}`)
    .then(response => {
      console.log(response)
      this.setState({
        name: response.data.bestMatches[0]['2. name']
      })
    })
  }

  // componentWillUnmount() {
  //   this.unsubscribeFromAuth();
  // }

  setImage = () => {
    if(this.state.imageExists)
    {
      return <div><img width="500px" height="500px" alt="oops!" src={this.state.image.url} /></div>
    }
  }

  render() {
    return (
      <div className="App">
        {this.setImage()}
        {this.state.name}
        <Route
            exact
            path="/SignIn"
            component={(props) => (
              <SignIn {...props} />
            )}
          />
          <Route
            exact
            path="/SignUp"
            component={(props) => (
              <SignUp {...props} />
            )}
          />
      </div>
    );
  }
}

export default App;