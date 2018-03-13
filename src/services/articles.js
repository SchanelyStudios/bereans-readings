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
    return firebase.database()
      .ref('articles/' + id)
      .once('value')
      .then(this.returnArticle);
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
      .then(this.returnArticle);
  }

  static getStructuredArticle(title, author, date, source, url, id) {
    return {
      id,
      title,
      author,
      date,
      source,
      url
    };
  }

  static returnArticle(snap) {
    let value = snap.val();
    if (value) {
      let id = null;
      for (let key in value) {
        id = key;
        break;
      }
      return {
        id,
        title: value.title,
        author: value.author,
        date: value.date,
        source: value.source,
        url: value.url
      };
    }
    return null;
  }

  static saveArticle(title, author, date, source, url) {
    const id = this.getId();
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

  static updateArticle(id, data) {
    // firebase.database().ref('articles/' + id).update(data);
  }

};

export default ArticleService;
