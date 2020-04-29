import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/navbar/Navbar';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/home/Home';
import Company from './Components/company/Company';
import SignIn from './Components/signInUp/SignIn';
import SignUp from './Components/signInUp/SignUp';
import {
  auth,
  createUserProfileDocument,
} from './Components/firebase/firebase.utils';
import Canvas from './Components/canvas/Canvas'

class App extends Component {
  /* START OF TRACK IF USER LOGGED IN OR NOT, PASS DOWN TO ALL COMPONENTS */
  state = {
    currentUser: null,
  };

  //method to set session to null.
  unsubscribeFromAuth = null;

  componentDidMount = () => {
    //Call auth method from Firebase to check whether or not we have an active session
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //Check if user logged in
      if (userAuth) {
        //If logged in, retrieve the data from user and set it to State
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      }
      //If logged out, clean state and set user to null
      else {
        this.setState({ currentUser: userAuth });
      }
    });
  };

  //On log out clean session data and set it to null
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  /* END OF TRACKING USER STATUS*/

  render() {
    return (
      <div>
        <Navbar user={this.state.currentUser} />
        {/* This component needs to be moved, so it doesnt load in every view. */}
        
        {/* <Canvas></Canvas>   */}
        {/* {this.setImage()} */}
        {/* <Canvas /> */}
        <Switch>
          <Route exact path="/" component={(props) => <Home {...props} />} />
          <Route
            path="/Company/:companySymbol"
            component={(props) => <Company {...props} />}
          />
          <Route
            exact
            path="/SignIn"
            component={(props) => (
              <SignIn {...props} user={this.state.currentUser} />
            )}
          />
          <Route
            exact
            path="/SignUp"
            component={(props) => (
              <SignUp {...props} user={this.state.currentUser} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
