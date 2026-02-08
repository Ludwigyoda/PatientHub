import NewsService from "../services/news.service.js";

const NewsController = {
    getRegionalNews: async (req, res) => {
        try {
            const region = req.query.region || 'Général';
            const news = await NewsService.getRegionalNews(region);
            res.json(news);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default NewsController;
