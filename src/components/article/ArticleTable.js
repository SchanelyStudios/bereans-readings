import React, { Component } from 'react';
import ArticleRow from './ArticleRow';
import './ArticleTable.css';

class ArticleTable extends Component {

  showRows() {
    let i = 0;
    return this.props.articles.map(article => {
      i = i + 1;
      return (
        <ArticleRow
          key={i}
          article={article}
          onIncludeClick={this.props.onIncludeClick} 
        />
      );
    });
  }

  render() {
    let articleRows = this.showRows();
    return (
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th
              className="article__include"
              title="Indicates whether or not this article is included in the recommended reading list"
            >
              &nbsp;
            </th>
            <th className="article__title">
              Title
            </th>
            <th className="article__author">
              Author
            </th>
            <th className="article__source">
              Source
            </th>
            <th className="article__date">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {articleRows}
        </tbody>
      </table>
    )
  }
}

export default ArticleTable;
