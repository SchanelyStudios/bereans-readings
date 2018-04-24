import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import NewsService from '../services/news';
import ArticleTable from './article/ArticleTable';

// import Typeahead from 'react-bootstrap-typeahead';
// import DatePicker from 'react-bootstrap-date-picker';

import 'react-bootstrap-typeahead/css/Typeahead.css';

class HomePage extends Component {

  constructor(props, state) {
    super(props, state);

    this.state = {
      loading: true,
      articles: [],
      articlesFound: false,
      sources: [],
      date: null,
      formattedDate: '',
      source: null,
      search: ''
    };

    this.changeDate = this.changeDate.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
    this.changeSource = this.changeSource.bind(this);
  }


  componentDidMount() {
    this.getArticles();
    this.getSources();
  }

  // componentDidUpdate() {
  //   // Access ISO String and formatted values from the DOM.
  //   var hiddenInputElement = document.getElementById("example-datepicker");
  //   console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
  //   console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016"
  // }

  async getArticles() {
    let options = {
      source: this.state.source,
      search: this.state.search,
      date: this.state.date
    }
    let articles = await NewsService.getNews(options);
    this.setState({
      articles,
      loading: false,
      articlesFound: articles.length > 0
    });
  }

  async getSources() {
    let sources = await NewsService.getSources();
    console.log(sources);
    this.setState({
      sources
    })
  }

  changeDate(date, formattedValue) {
    this.setState({
      date, // ISO String, ex: "2016-11-19T12:00:00.000Z"
      formattedDate: formattedValue // Formatted String, ex: "11/19/2016"
    });
  }

  changeSource(source) {
    this.setState({ source }, () => {
      this.getArticles();
    });
  }

  changeSearch(e) {
    e.preventDefault();
    let search = e.target.value;
    this.setState({ search }, () => {
      this.getArticles();
    });
  }

  showToolbar() {
    return (
      <div className="toolbar">
        <input type="text" value={this.state.search} onChange={this.changeSearch} />
        {/*<DatePicker id="example-datepicker" value={this.state.date} onChange={this.changeDate} />*/}
        {/*<Typeahead
          onChange={this.changeSource}
          options={this.state.sources}
          selected={this.state.source}
        />*/}
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
