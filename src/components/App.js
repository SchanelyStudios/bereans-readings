import React, { Component } from 'react';
import firebase from '../services/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Header from './common/Header';
// import './App.css';

class App extends Component {

  // The component's Local state.
  state = {
    signedIn: false // Local signed-in state.
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
      signInSuccess: () => false
    }
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ signedIn: !!user });
    });
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
