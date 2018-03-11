import React, { Component } from 'react';
import ArticleService from '../services/articles';
import ArticleTable from './article/ArticleTable';
import './HomePage.css';

class ArticlesPage extends Component {

  state = {
    articles: []
  };

  constructor() {
    super();
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    // Here we get the articles from Firebase since these are the current set of
    // recommended readings
    ArticleService.getArticles().then(articles => {
      this.setState({
        articles
      });
    });
  }

  deleteItem(id) {
    // On this page we want to physically remove a deleted recommendation
    let articles = this.state.articles;
    this.setState({
      articles: []
    });
    let i = 0;
    // So we search for the matching article as the one whose id is passed up to here
    for (let article of articles) {
      if (article.id === id) {
        // We delete it from Firebase and from this list
        ArticleService.deleteArticle(id);
        articles.splice(i, 1);
        break;
      }
      i = i + 1;
    }

    // Modified list gets passed back to state
    this.setState({
      articles
    })
  }

  render() {
    return (
      <div className="ArticlesPage">
        <ArticleTable articles={this.state.articles} itemsDelete={true} onDeleteItem={this.deleteItem} />
      </div>
    );
  }

}
export default ArticlesPage;
