import React, { Component } from 'react';
import ArticleService from '../services/articles';
import { Link, Redirect } from 'react-router-dom';
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
    },
    redirect: false
  };

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    console.log(id);
    if (id === '0') {
      return;
    }
    this.getArticle(id);
  }

  async getArticle(id) {
    let article = await ArticleService.getArticle(id);
    if (article) {
      article.date = Date.parse(article.date).toString('yyyy-MM-dd');
      article.id = id;
      this.setState({
        article
      });
    }
  }

  onChange(e) {
    e.preventDefault();
    let changes = this.state.article;
    changes[e.target.name] = e.target.value;
    this.setState({
      article: changes
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let article = this.state.article;
    if (article.id) {
      ArticleService.updateArticle(
        article.id,
        article.title,
        article.author,
        article.date,
        article.source,
        article.url
      );
      this.setState({
        redirect: true
      });
    } else {
      ArticleService.saveArticle(
        article.title,
        article.author,
        article.date,
        article.source,
        article.url
      );
      this.setState({
        redirect: true
      });
    }
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={'/recommended'} />
      );
    }
    return (
      <form className="EditArticlePage row mt-3" onSubmit={this.onSubmit}>
        <ul className="list-unstyled col-12">
          <li className="form-group row">
            <label className="col-form-label col-sm-2" htmlFor="article-title">Title</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="article-title"
                name="title"
                placeholder="Title of the article"
                value={this.state.article.title}
                onChange={this.onChange}
              />
            </div>
          </li>
          <li className="form-group row">
            <label className="col-form-label col-sm-2" htmlFor="article-author">Author</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="article-author"
                name="author"
                placeholder="Author(s) of the article"
                value={this.state.article.author}
                onChange={this.onChange}
              />
            </div>
          </li>
          <li className="form-group row">
            <label className="col-form-label col-sm-2" htmlFor="article-date">Date published</label>
            <div className="col-sm-10">
              <input
                type="date"
                className="form-control"
                id="article-date"
                name="date"
                placeholder="Date article was published"
                value={this.state.article.date}
                onChange={this.onChange}
              />
            </div>
          </li>
          <li className="form-group row">
            <label className="col-form-label col-sm-2" htmlFor="article-source">Source</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="article-source"
                name="source"
                placeholder="Source of the article"
                value={this.state.article.source}
                onChange={this.onChange}
              />
            </div>
          </li>
          <li className="form-group row">
            <label className="col-form-label col-sm-2" htmlFor="article-url">URL</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="article-url"
                name="url"
                placeholder="http://"
                value={this.state.article.url}
                onChange={this.onChange}
              />
            </div>
          </li>
        </ul>
        <div className="col-12">
          <button className="btn btn-success" type="submit">Save</button>
          &nbsp;
          <Link className="btn btn-primary" to={'/recommended'}>Cancel</Link>
        </div>
      </form>
    );
  }

}
export default EditArticlePage;
