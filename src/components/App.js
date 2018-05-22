import React, { Component } from 'react';

import firebase from '../services/firebase';
import AuthService from '../services/auth';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Header from './common/Header';
// import './App.css';

class App extends Component {

  // The component's Local state.
  state = {
    signedIn: false, // Local signed-in state.
    authenticated: false // Verified in local users db state.
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccess: () => {
        return false;
      }
    }
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.checkAuth(user);
      this.setState({ signedIn: !!user });
    });
  }

  async checkAuth(user) {
    if (this.state.authenticated) {
      return true;
    }
    let auth = await AuthService.checkAuth(user);
    this.setState({
      authenticated: auth
    })
  }

  render() {
    if (!this.state.signedIn) {
      return (
        <div className="container-fluid">
          <Header />
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    } else if (!this.state.authenticated) {
      return (
        <div className="container-fluid">
          <Header />
          <p>Your account must be enabled before you can use this application. Contact the site adminsitrator for assistance.</p>
        </div>
      )
    }
    return (
      <div className="container-fluid">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default App;
