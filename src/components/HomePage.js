import React, { Component } from 'react';
import firebase from '../services/firebase';
import NewsService from '../services/news';
import './HomePage.css';

import ArticleTable from './article/ArticleTable';

class HomePage extends Component {

  db = firebase.database().ref();
  news = new NewsService();

  state = {
    articleCount: 0,
    articles: []
  };

  componentDidMount() {

    this.news.getTopNews().then(articles => {
      this.setState({
        articles: articles
      });
    });

  }

  onIncludeClick(data) {
    console.log(data);
  }


  render() {
    return (
      <div className="HomePage">
        <p>Articles: {this.state.articleCount}</p>
        <ArticleTable articles={this.state.articles} onIncludeClick={this.onIncludeClick} />
      </div>
    );
  }
}

export default HomePage;
