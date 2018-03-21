import NewsAPI from '../vendor/newsapi/index';

const key = '02648d661f7f44dfba038f182e973f62';
const newsApi = new NewsAPI(key);

class NewsService {

  static getTopNews(query, sources) {
    return newsApi.v2.topHeadlines({
      language: 'en',
      country: 'us',
      pageSize: 25,
      page: 2
    }).then(response => {
      return response.articles;
    });
  }

  static getUSNews(pageNum) {
    let pageSize = 25;
    return newsApi.v2.everything({
      sources: 'bbc-news,abc-news,associated-press,cbs-news,cnbc,axios,fox-news,msnbc,newsweek,politico,the-guardian-uk,the-new-york-times,usa-today,the-wall-street-journal',
      language: 'en',
      pageSize: pageSize,
      page: pageNum ? pageNum : 1
    }).then(response => {
      response.pageSize = pageSize;
      return response;
    });
  }

}

export default NewsService;
