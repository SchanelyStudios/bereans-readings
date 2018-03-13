import React, { Component } from 'react';
import ArticleService from '../services/articles';
// import './EditArticlePage.css';

class EditArticlePage extends Component {

  state = {
    article: {
      id: null,
      title: '',
      author: '',
      date: '',
      source: '',
      url: ''
    }
  };

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // TODO: get id for current article and retrieve its match from the database
  }

  onChange(e) {
    e.preventDefault();
    // TODO: Look up how to efficiently update state on change
  }

  onSubmit(e) {
    e.preventDefault();
    let article = this.state;
    // TODO: Check for id and send either set or update request
    if (article.id) {
      // Update request
    } else {
      // Set request
    }
  }

  render() {
    return (
      <form className="EditArticlePage row" onSubmit={this.submit}>
        <ul className="list-unstyled col-12">
          <li className="form-group">
            <label for="article-title">Title</label>
            <input
              type="text"
              className="form-control"
              id="article-title"
              name="title"
              placeholder="Title of the article"
              value={this.state.article.title}
              onChange={this.onChange}
            />
          </li>
          <li className="form-group">
            <label for="article-author">Author</label>
            <input
              type="text"
              className="form-control"
              id="article-author"
              name="author"
              placeholder="Author(s) of the article"
              value={this.state.article.author}
              onChange={this.onChange}
            />
          </li>
          <li className="form-group">
            <label for="article-date">Date published</label>
            <input
              type="date"
              className="form-control"
              id="article-date"
              name="date"
              placeholder="Date article was published"
              value={this.state.article.date}
              onChange={this.onChange}
            />
          </li>
          <li className="form-group">
            <label for="article-source">Source</label>
            <input
              type="text"
              className="form-control"
              id="article-source"
              name="source"
              placeholder="Source of the article"
              value={this.state.article.source}
              onChange={this.onChange}
            />
          </li>
          <li className="form-group">
            <label for="article-url">URL</label>
            <input
              type="text"
              className="form-control"
              id="article-url"
              name="url"
              placeholder="http://"
              value={this.state.article.url}
              onChange={this.onChange}
            />
          </li>
        </ul>
        <p className="col-12"><button type="submit">Save</button></p>
      </form>
    );
  }

}
export default EditArticlePage;
