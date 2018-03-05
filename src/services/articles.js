import firebase from './firebase';

class ArticleService {

  static getArticlecount() {
    return firebase.database().child('articleCount').on('value', snap => {
      return snap;
      // set state to snap.val();...
    });
  }

  static saveArticle(title, author, date, url, source) {
    firebase.database().ref('article/').set({
      title: title,
      author: author,
      date: date,
      source : source,
      url: url
    });
  }

};

export default ArticleService;
