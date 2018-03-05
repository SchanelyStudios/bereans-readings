import React, { Component } from 'react';
import ArticleService from '../../services/articles.js';
import 'datejs';

class ArticleRow extends Component {

  state = {
    include: false,
    title: '',
    source: '',
    date: '',
    author: '',
    url: '',
    id: 0
  }

  constructor() {
    super();
    this.onIncludeClick = this.onIncludeClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      include: true
    });
    this.setupArticleFromApi();
  }

  onIncludeClick(e) {
    // ArticleService.saveArticle(
    //   this.state.title,
    //   this.state.author,
    //   this.state.date,
    //   this.state.source,
    //   this.state.url
    // );
    let included = !this.state.include;

    this.props.onIncludeClick({
      article: this.state.article,
      include: included
    });

    this.setState({
      include: included
    });
  }

  setupArticleFromApi() {
    let article = this.props.article;
    this.setState({
      title: article.title,
      author: article.author,
      date: article.publishedAt,
      source: article.source.name,
      url: article.url
    });
  }

  render() {
    let date = new Date(this.state.date).toString('MMM d, yyyy');
    let include = this.state.include ? '+' : '–';

    return (
      <tr>
        <td className="article__include" onClick={this.onIncludeClick}>{include}</td>
        <td className="article__title">
          <a href={this.state.url} className="article__title" target="_blank">
            <i>{this.state.title}</i>
          </a>
        </td>
        <td className="article__author">{this.state.author}</td>
        <td className="article__source">{this.state.source}</td>
        <td className="article__date">{date}</td>
      </tr>
    );
  }
}

export default ArticleRow;
