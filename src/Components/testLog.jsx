import React, { Component } from 'react';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { Link } from 'react-router-dom';

const Header = ({ user }) => {
  return (
    <div>
      {user ? (
        <button onClick={() => auth.signOut()}>Log Out</button>
      ) : (
        <button>
          <Link to="/SignIn">Sign In</Link>
        </button>
      )}
    </div>
  );
};

export default class TestLog extends Component {
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

  render() {
    return (
      <div>
        <Header user={this.state.currentUser} />
      </div>
    );
  }
}
