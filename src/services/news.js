import NewsAPI from '../vendor/newsapi/index';
import 'datejs';

const key = '02648d661f7f44dfba038f182e973f62';
const newsApi = new NewsAPI(key);
const defaultSource = 'bbc-news';

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
    pageNum = pageNum ? pageNum : 1;
    return newsApi.v2.everything({
      sources: 'bbc-news,abc-news,associated-press,cbs-news,cnbc,axios,fox-news,msnbc,newsweek,politico,the-guardian-uk,the-new-york-times,usa-today,the-wall-street-journal',
      language: 'en',
      pageSize: pageSize,
      page: pageNum
    }).then(response => {
      response.pageSize = pageSize;
      return response;
    });
  }

  static getNews(options) {
    let pageSize = 100;
    let source = options && options.source ? options.source : defaultSource;
    let search = options && options.search ? options.search : null;
    let date = options && options.date ? options.date: Date.today().toString('yyyy-MM-dd')
    return newsApi.v2.everything({
      q: search,
      sources: source,
      from: date,
      to: date,
      language: 'en',
      pageSize: pageSize
    }).then(response => {
      response.pageSize = pageSize;
      return response.articles;
    });
  }

  static getSources() {
    return newsApi.v2.sources({
      language: 'en',
    }).then(response => {
      return response.sources;
    });
  }

}

export default NewsService;
