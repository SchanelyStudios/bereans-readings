import NewsAPI from 'newsapi';

class NewsService {

  key = '02648d661f7f44dfba038f182e973f62';
  newsApi = new NewsAPI(this.key);

  getTopNews() {
    return this.newsApi.v2.topHeadlines({
      language: 'en',
      country: 'us',
      pageSize: '50'
    }).then(response => {
      return response.articles;
    });
  }

  getUSNews() {
    return this.newsApi.v2.topHeadlines({
      language: 'en',
      country: 'us',
      pageSize: '50'
    }).then(response => {
      return response.articles;
    });
  }

}

export default NewsService;
