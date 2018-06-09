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
    authenticated: false, // Verified in local users db state.
    user: null
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
      this.setState({
        signedIn: !!user
      });
    });
  }

  async checkAuth(user) {
    let localUser;
    if (!this.state.authenticated) {
      localUser = await AuthService.checkAuth(user);
      if (!localUser) {
        return false;
      }
    } else {
      localUser = AuthService.getLocalUserData();
    }

    this.setState({
      authenticated: localUser.auth,
      user: localUser
    });
  }

  render() {
    if (!this.state.signedIn) {
      return (
        <div className="container-fluid">
          <Header user={this.state.user} />
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    } else if (!this.state.authenticated) {
      return (
        <div className="container-fluid">
          <Header user={this.state.user} />
          <p>Your account must be enabled before you can use this application. Contact the site adminsitrator for assistance.</p>
        </div>
      )
    }
    return (
      <div className="container-fluid">
        <Header user={this.state.user} />
        {this.props.children}
      </div>
    );
  }
}

export default App;
