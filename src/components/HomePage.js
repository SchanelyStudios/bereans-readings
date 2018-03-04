import React, { Component } from 'react';
import fdb from '../services/firebase';
import './HomePage.css';

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      articleCount: 0
    };
  }

  componentDidMount() {
    console.log('component did mount');
    const root = fdb.ref();
    console.log(root);
    const articleCountRef = root.child('articleCount');
    console.log(articleCountRef);
    articleCountRef.on('value', snap => {
      console.log('value change', snap.val());
      this.setState({
        articleCount: snap.val()
      });
    });
  }

  render() {
    return (
      <div className="HomePage">
        <h2>Welcome home.</h2>
        <p>Articles: {this.state.articleCount}</p>
      </div>
    );
  }
}

export default HomePage;
