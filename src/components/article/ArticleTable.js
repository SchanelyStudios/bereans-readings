import React, { Component } from 'react';
import ArticleRow from './ArticleRow';
import './ArticleTable.css';

class ArticleTable extends Component {

  constructor() {
    super();
    this.deleteRow = this.deleteRow.bind(this);
  }

  showRows() {
    let i = 5000;
    return this.props.articles.map(article => {
      // Ideally we need a unique key not just the index, so we check for an actua
      // id value and prefer it over the index.
      i = i + 1;
      let id = article.id;
      if (!id) {
        id = i;
      }
      return (
        <ArticleRow
          key={id}
          article={article}
          deleteOnRemove={this.props.itemsDelete}
          onDelete={this.deleteRow}
        />
      );
    });
  }

  deleteRow(id) {
    this.props.onDeleteItem(id);
  }

  render() {
    let articleRows = this.showRows();
    return (
      <table className="table table-hover">
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
            <th className="article__author-source">
              Author and Source
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
