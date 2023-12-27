import { newsDto } from "../dto/news.dto.js";
import { newsRepository } from "../model/news.model.js";

class NewsService {
  async addNews(data, userId) {
    const news = await newsRepository.create(data, userId);
    return news;
  }
  async showNews() {
    const news = await newsRepository.showNews();
    return news;
  }
  async updateNews(newData, id) {
    const news = await newsRepository.updateNews(newData, id);
    return news;
  }
  async delNews(id) {
    const news = await newsRepository.delNews(id);
    return news;
  }
}

export const newsService = new NewsService();
