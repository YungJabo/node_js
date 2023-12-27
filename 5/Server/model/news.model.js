import { NewsModel, UserModel } from "./schemas/index.js";
import { newsDto } from "../dto/news.dto.js";

class NewsRepository {
  async showNews() {
    const allNews = await NewsModel.find();
    const filteredNews = allNews.map(newsDto);
    return filteredNews;
  }
  async create(dto, userId) {
    try {
      const userModel = await UserModel.findById(userId);
      const newsData = newsDto({ ...dto, user: userModel });
      const newsModel = new NewsModel(newsData);
      const news = await newsModel.save();
      const allNews = await this.showNews();
      return allNews;
    } catch (error) {
      console.log(error);
    }
  }
  async updateNews(data, id) {
    const newsModel = await NewsModel.findById(id);
    newsModel.text = data.text;
    newsModel.title = data.title;
    const updateNews = newsModel.save();
    const allNews = await this.showNews();
    return allNews;
  }

  async delNews(id) {
    await NewsModel.findByIdAndDelete(id);
    const allNews = await this.showNews();
    return allNews;
  }
}

export const newsRepository = new NewsRepository();
