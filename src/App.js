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
  render() {
    return (  
      <div> 
      <Navbar/>
      <Gif/>
        {/* <Canvas></Canvas>   */}
        {/* {this.setImage()} */}
        <Switch>
          <Route exact path="/" component={(props) =>   <Home {...props} /> } />
          <Route path="/:companySymbol" component={(props) =>   <Company {...props} /> } />
        </Switch>
        
        

      </div>
    );
  }
}

export default App;