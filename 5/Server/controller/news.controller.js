import { newsService } from "../services/news.service.js";

class NewsController {
  async addNews(req, res) {
    try {
      const news = await newsService.addNews(req.body, req.user.id);
      res.json(news);
    } catch (error) {
      res.status(401).json({
        message: error.message,
      });
    }
  }
  async showNews(req, res) {
    try {
      const news = await newsService.showNews();
      res.json(news);
    } catch (error) {
      res.status(401).json({
        message: error.message,
      });
    }
  }
  async updateNews(req, res) {
    try {
      console.log(req.params);
      const { id } = req.params;
      const news = await newsService.updateNews(req.body, id);
      res.json(news);
    } catch (error) {
      res.status(401).json({
        message: error.message,
      });
    }
  }

  async delNews(req, res) {
    try {
      console.log("REQ:   --->   ", req);
      const { id } = req.params;
      const news = await newsService.delNews(id);
      res.json(news);
    } catch (error) {
      res.status(401).json({
        message: error.message,
      });
    }
  }
}

export const newsController = new NewsController();
