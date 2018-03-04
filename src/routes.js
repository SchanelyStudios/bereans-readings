import React from 'react';
import { Route } from 'react-router';
import App from './components/App';
import HomePage from './components/HomePage';
import ArticlesPage from './components/ArticlesPage';

export default (
  <App>
    <Route path="/" component={HomePage} />
    <Route path="/articles" component={ArticlesPage} />
  </App>
);
