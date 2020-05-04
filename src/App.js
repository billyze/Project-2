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
import { UserProfile } from './Components/userProfile/userProfile';
import SearchBar from './Components/searchBar/SearchBar';
// import Canvas from './Components/canvas/Canvas';
import Footer from './Components/footer/Footer';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

class App extends Component {
  /* START OF TRACK IF USER LOGGED IN OR NOT, PASS DOWN TO ALL COMPONENTS */
  state = {
    currentUser: null,
    isData: false,
    isLoad: false,
    theme: false,
    search: '',
  };

  darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  lightTheme = createMuiTheme({
    palette: {
      type: 'light',
    },
  });

  theme = () => {

    this.setState({
      theme: !this.state.theme
    })
    let body = document.getElementsByTagName('body')[0];
    let nav = document.getElementById('navBar');
    var style = document.createElement('style');

    if (!this.state.theme) {
      body.classList.add('darkTheme');
      nav.classList.add('darkTheme');
      style.innerHTML = `
  a {
  color: white;
  }
  body{
    color: #fff
  }
  `;
      document.head.appendChild(style);
    } else {
      body.classList.remove('darkTheme');
      nav.classList.remove('darkTheme');
      style.innerHTML = `
  a {
  color: black;
  }

  body{
    color: #000
  }
  `;
      document.head.appendChild(style);
    }
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
            isData: true,
          });
        });
      }
      //If logged out, clean state and set user to null
      else {
        this.setState({ currentUser: userAuth, isData: false });
      }
    });
  };

  //On log out clean session data and set it to null
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  /* END OF TRACKING USER STATUS*/
  /* START OF TRACK IF USER LOGGED IN OR NOT, PASS DOWN TO ALL COMPONENTS */

  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  isLoad = () => {
    this.setState({
      isLoad: true,
    });
  };

  render() {
    return (
      <ThemeProvider
        theme={this.state.theme ? this.darkTheme : this.lightTheme}
      >
        <div>
          <Navbar
            user={this.state.currentUser}
            handleChange={this.handleChange}
            theme={this.theme}
          />
          {/* This component needs to be moved, so it doesnt load in every view. */}

          {/* <Canvas></Canvas>   */}
          {/* {this.setImage()} */}
          {/* <Canvas /> */}
          <Switch>
            <Route
              exact
              path="/"
              component={(props) => <Home {...props} isLoad={this.isLoad} />}
            />
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
            <Route
              exact
              path="/Search"
              component={(props) => (
                <SearchBar
                  {...props}
                  query={this.state.search}
                  user={this.state.currentUser}
                  data={this.state.isData}
                />
              )}
            />
            <Route
              exact
              path="/Profile"
              component={(props) => (
                <UserProfile
                  {...props}
                  user={this.state.currentUser}
                  data={this.state.isData}
                />
              )}
            />
          </Switch>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
