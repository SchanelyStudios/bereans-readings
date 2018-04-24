import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    id: null
  }

  constructor() {
    super();
    this.onIncludeClick = this.onIncludeClick.bind(this);
  }

  componentDidMount() {
    // An article with an id would be coming from Firebase which we must treat
    // differently from one coming straight from the NewsAPI
    if (this.props.article.id) {
      this.setupArticleFromFirebase();
    } else {
      this.setupArticleFromApi();
    }
  }

  onIncludeClick(e) {
    let include = !this.state.include;

    // If its not included add it to Firebase
    if (include) {
      let id = ArticleService.saveArticle(
        this.state.title,
        this.state.author,
        this.state.date,
        this.state.source,
        this.state.url
      );
      // And ensure its new id is populated to state
      this.setState({
        id
      });

    // Otherwise, it is included but lets make sure we have an id first
    } else if (this.state.id) {
      let id = this.state.id;
      this.setState({
        id: null
      });
      // Then if a true deletion is needed (as in we're looking at just a list
      // from firebase) we pass this up the chain so that grandparent who's
      // managing state for the list of articles can actually do the deleting.
      if (this.props.deleteOnRemove) {
        this.props.onDelete(id);
      } else {
        ArticleService.deleteArticle(id);
      }
    }

    // Regardless, we set state accordingly
    this.setState({
      include
    });
  }

  setupArticleFromApi() {
    // Add the properties from the News API to state
    this.setState({
      title: this.props.article.title,
      author: this.props.article.author,
      date: this.props.article.publishedAt,
      source: this.props.article.source.name,
      url: this.props.article.url
    });

    // Look for a match in the database and if one is found, add id and included
    // ArticleService.getArticleByUrl(this.props.article.url).then(article => {
    //   if (article) {
    //     this.setState({
    //       include: true,
    //       id: article.id
    //     });
    //   }
    // });

  }

  setupArticleFromFirebase() {
    // Add all properties to state
    this.setState({
      id: this.props.article.id,
      title: this.props.article.title,
      author: this.props.article.author,
      date: this.props.article.date,
      source: this.props.article.source,
      url: this.props.article.url,
      include: true
    });
  }

  render() {
    let date = new Date(this.state.date).toString('MMM d, yyyy');
    let include = this.state.include ? (
      <div>
        <button className="btn btn-danger btn-sm" onClick={this.onIncludeClick}>&minus;</button>
        <Link  className="btn btn-warning btn-sm" to={'article/' + this.state.id}>Edit</Link>
      </div>
    ) : (
      <button className="btn btn-success btn-sm" onClick={this.onIncludeClick}>+</button>
    );

    return (
      <tr id={`article-${this.state.id}`}>
        <td className="article__include">{include}</td>
        <td className="article__title">
          <a href={this.state.url} className="article__title" target="_blank">
            <i>{this.state.title}</i>
          </a>
        </td>
        <td className="article__author-source">
          {this.state.author}
          <br />
          <i>{this.state.source}</i>
        </td>
        <td className="article__date">{date}</td>
      </tr>
    );
  }
}

export default ArticleRow;
