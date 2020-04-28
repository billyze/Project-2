import React, { Component } from 'react';
import './App.css';
// import { Switch, Route } from 'react-router-dom'
import Gif from './components/Gif'
import Navbar from './components/Navbar'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import Company from './components/Company'
// import Canvas from './Components/Canvas'
class App extends Component {
  
  state = {
    name: '',
    image: [],
    company: {},
    imageExists: false
  }

  


  render() {
    return (  
      <div className="App"> 
      <Navbar/>
      <Gif/>
        {/* <Canvas></Canvas>   */}
        {/* {this.setImage()} */}
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