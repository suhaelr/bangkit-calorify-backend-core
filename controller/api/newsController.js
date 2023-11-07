const axios = require('axios');
const NewsAPI = require('newsapi');
const config = require('../../config');
const newsapi = new NewsAPI(config.news_key);


const getNews = async (req, res) => {
  try {
    const response = await axios.get(config.news_url, {
      params: {
        country: 'id',
        category: 'health',
        apiKey: newsapi
      }
    });

    const newsData = response.data;
    res.json(newsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code:200,
      error: 'An error occurred',
     });
  }
};

module.exports = {getNews};