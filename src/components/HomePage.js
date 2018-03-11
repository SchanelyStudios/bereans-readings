import React, { Component } from 'react';
import NewsService from '../services/news';
import ArticleTable from './article/ArticleTable';
import './HomePage.css';

class HomePage extends Component {

  state = {
    articles: []
  };

  componentDidMount() {
    NewsService.getTopNews().then(articles => {
      this.setState({
        articles: articles
      });
    });
  }

  render() {
    return (
      <div className="HomePage">
        <ArticleTable articles={this.state.articles} itemsDelete={false} />
      </div>
    );
  }

}
export default HomePage;
