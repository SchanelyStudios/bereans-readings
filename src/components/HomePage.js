import React, { Component } from 'react';
import NewsService from '../services/news';
import ArticleTable from './article/ArticleTable';

class HomePage extends Component {

  state = {
    articles: [],
    pageCount: 1,
    currentPage: 1
  };

  componentDidMount() {
    NewsService.getUSNews().then(response => {
      let pageCount = Math.ceil(response.totalResults / response.pageSize);
      this.setState({
        articles: response.articles,
        pageCount
      });
    });
  }

  changePage(pageNum, e) {
    e.preventDefault();

    // First exit if pageNum is out of range
    if (pageNum < 0 || pageNum > this.state.pageCount) {
      return;
    }

    // Determine desired page, defaulting to one past current
    let currentPage = this.state.currentPage + 1;
    if (pageNum) {
      currentPage = pageNum;
    }

    NewsService.getUSNews(currentPage).then(response => {
      let pageCount = Math.ceil(response.totalResults / response.pageSize);
      this.setState({
        articles: response.articles,
        pageCount,
        currentPage
      });
    });
  }

  pagination() {

    // Build item list
    let items = [];
    for (var i = 0; i < this.state.pageCount; i++) {
      let className = 'page-item';
      className += this.state.pageNum === i + 1 ? ' active' : '';
      items.push(
        <li key={i} className={className}>
          <a className="page-link" onClick={this.changePage.bind(this, i + 1)}>{i + 1}</a>
        </li>
      );
    }

    // Set up previous and next link classes to disable them when necessary
    let prevLinkClassName = 'page-item';
    prevLinkClassName += this.state.currentPage === 1 ? ' disabled': '';

    let nextLinkClassName = 'page-item';
    nextLinkClassName += this.state.currentPage === this.state.pageCount ? ' disabled': '';

    return (
      <nav>
        <ul className="pagination">
          <li className={prevLinkClassName}>
            <a
              className="page-link"
              onClick={this.changePage.bind(this, this.state.currentPage - 1)}
            > 
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          {items}
          <li className={nextLinkClassName}>
            <a
              className="page-link"
              onClick={this.changePage.bind(this.state.currentPage + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }

  render() {
    return (
      <div className="HomePage">
        <ArticleTable articles={this.state.articles} itemsDelete={false} />
        {this.pagination()}
      </div>
    );
  }

}
export default HomePage;
