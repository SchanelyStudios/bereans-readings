import React from 'react';
import { Route } from 'react-router';

import App from './components/App';
import ArticlesPage from './components/ArticlesPage';
import EditArticlePage from './components/EditArticlePage';
import HomePage from './components/HomePage';
import ManageUsersPage from './components/ManageUsersPage';

export default (
  <App>
    <Route path="/" exact={true} component={HomePage} />
    <Route path="/article/:id" component={EditArticlePage} />
    <Route path="/page/:pageId" exact={true} component={HomePage} />
    <Route path="/recommended" component={ArticlesPage} />
    <Route path="/users" component={ManageUsersPage} />
  </App>
);
