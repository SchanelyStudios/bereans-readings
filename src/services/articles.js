import firebase from './firebase';
import * as uuid from 'uuid/v1';

class ArticleService {

  static getId() {
    return uuid();
  }

  static deleteArticle(id) {
    return firebase.database()
      .ref('articles/' + id)
      .remove();
  }

  static getArticle(id) {
    let root = this;
    return firebase.database()
      .ref('articles/' + id)
      .once('value')
      .then(snap => {
        return root.returnArticle(snap, id);
      });
  }

  static getArticles() {
    return firebase.database()
      .ref('articles')
      .once('value')
      .then(snap => {
        let val = snap.val();
        let articles = [];
        for (let id in val) {
          let article = val[id];
          articles.push({
            id,
            title: article.title,
            author: article.author,
            date: article.date,
            source: article.source,
            url: article.url
          });
        }
        return articles;
      });
  }

  static getArticleByUrl(url) {
    return firebase.database()
      .ref('articles')
      .orderByChild('url')
      .equalTo(url)
      .once('value')
      .then(ArticleService.returnArticle);
  }

  static getStructuredArticle(title, author, date, source, url, id) {
    return {
      id: id ? id : 0,
      title: title ? title : '',
      author: author ? author : '',
      date: date ? date : '',
      source: source ? source : '',
      url: url ? url : ''
    };
  }

  static returnArticle(snap, id) {
    let value = snap.val();
    if (value && value.title) {
      return ArticleService.getStructuredArticle(
        value.title,
        value.author,
        value.date,
        value.source,
        value.url,
        id
      );
    } else if (value) {
      id = null;
      for (let key in value) {
        id = key;
        break;
      }
      return ArticleService.getStructuredArticle(
        value.title,
        value.author,
        value.date,
        value.source,
        value.url,
        id
      );
    }
    return null;
  }

  static saveArticle(title, author, date, source, url) {
    const id = ArticleService.getId();
    let article = {
      title,
      author,
      date,
      source,
      url
    };
    firebase.database().ref('articles/' + id).set(article);
    return id;
  }

  static updateArticle(id, title, author, date, source, url) {
    firebase.database().ref('articles/' + id).update({
      title,
      author,
      date,
      source,
      url
    });
  }

};

export default ArticleService;
