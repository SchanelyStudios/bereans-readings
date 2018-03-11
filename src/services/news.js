import NewsAPI from 'newsapi';

const key = '02648d661f7f44dfba038f182e973f62';
const newsApi = new NewsAPI(key);

class NewsService {

  static getTopNews(query, sources) {
    return newsApi.v2.topHeadlines({
      language: 'en',
      country: 'us',
      pageSize: 25
    }).then(response => {
      return response.articles;
    });
  }

  static getUSNews() {
    return newsApi.v2.topHeadlines({
      language: 'en',
      country: 'us',
      pageSize: 25
    }).then(response => {
      return response.articles;
    });
  }

}

export default NewsService;
