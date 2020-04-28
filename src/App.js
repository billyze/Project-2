import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Home from './Components/Home'
import Company from './Components/Company'
import Canvas from './Components/Canvas'
class App extends Component {
  
  state = {
    name: '',
    image: [],
    company: {},
    imageExists: false
  }

  

  setImage = () => {
    if(this.state.imageExists)
    {
      return <div><img width="500px" height="500px" alt="oops!" src={this.state.image.url} /></div>
    }
  }

  render() {
    return (  
      <div className="App"> 
        {/* <Canvas></Canvas>   */}
        {this.setImage()}
        <Switch>
          <Route exact path="/" component={(props) =>   <Home {...props} /> } />
          <Route path="/:companySymbol" component={(props) =>   <Company {...props} /> } />
        </Switch>
        {this.state.name}
      </div>
    );
  }
}

export default App;