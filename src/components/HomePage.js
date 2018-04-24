import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import NewsService from '../services/news';
import ArticleTable from './article/ArticleTable';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Typeahead } from 'react-bootstrap-typeahead';

class HomePage extends Component {

  constructor(props, state) {
    super(props, state);

    this.state = {
      loading: true,
      articles: [],
      articlesFound: false,
      sources: [],
      sourcesLoading: true,
      source: null,
      search: '',
      date: moment()
    };

    this.changeDate = this.changeDate.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
    this.changeSource = this.changeSource.bind(this);
  }

  componentDidMount() {
    this.getArticles();
    this.getSources();
  }

  async getArticles() {
    this.setState({
      loading: true,
      articles: []
    });
    let options = {
      source: this.state.source,
      search: this.state.search,
      date: this.state.date.format('YYYY-MM-DD')
    };
    let articles = await NewsService.getNews(options);
    this.setState({
      articles,
      loading: false,
      articlesFound: articles.length > 0
    });
  }

  async getSources() {
    let sources = await NewsService.getSources();
    let searchableSources = []
    for (let source of sources) {
      searchableSources.push({
        id: source.id,
        label: source.name
      });
    }
    this.setState({
      sources: searchableSources,
      source: searchableSources[0].id,
      sourcesLoading: false
    });
  }

  changeDate(date) {
    date = date ? date : moment();
    this.setState({ date }, () => this.getArticles() );
  }

  changeSource(source) {
    console.log('changed source...');
    let sourceId = null;
    if (source && source.length >= 1) {
      sourceId = source[0].id;
    }
    this.setState({ source: sourceId }, () => this.getArticles() );
  }

  changeSearch(e) {
    e.preventDefault();
    let search = e.target.value;
    this.setState({ search }, () => {
      this.getArticles();
    });
  }

  showToolbar() {
    let typeahead = '';
    if (this.state.sourcesLoading) {
      typeahead = (
        <p className="sources">Sources loading...</p>
      );
    } else if (this.state.sources.length > 0) {
      typeahead = (
        <Typeahead
          onChange={this.changeSource}
          options={this.state.sources}
          placeholder="Choose a source..."
        />
      );
    }

    return (
      <div className="toolbar">
        <div className="toolbar__search">
          <input
            className="form-control"
            type="text"
            value={this.state.search}
            onChange={this.changeSearch}
            placeholder="Search for..."
          />
        </div>
        <div className="toolbar__date">
          <label>Publish date:</label>
          <DatePicker
            className="form-control"
            selected={this.state.date}
            onChange={this.changeDate}
          />
        </div>
        <div className="toolbar__sources">
          <label>Source</label>
          {typeahead}
        </div>
      </div>
    );
  }

  render() {
    let output;
    let toolbar = this.showToolbar();

    if (this.state.loading) {
      output = (
        <p>Loading articles...</p>
      );
    } else if (!this.state.articlesFound) {
      output = (
        <p>No articles found. Please adjust the search and filter settings.</p>
      );
    } else {
      output = (
        <ArticleTable articles={this.state.articles} itemsDelete={false} />
      );
    }

    return (
      <div className="HomePage">
        {toolbar}
        {output}
      </div>
    );
  }

}
export default HomePage;
