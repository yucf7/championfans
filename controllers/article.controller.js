const Article = require("../models/article.model");
const Media = require("../models/media.model");

module.exports.create = async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    // Calculate offset based on the page and limit
    const offset = (page - 1) * limit;

    const articles = await Article.findAll({
      limit: Number(limit),
      offset: offset,  // Pagination offset
    });

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getById = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    const views = article.views === null ? 0 : Number(article.views);

    article.views = views + 1;

    await article.save();

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports.update = async (req, res) => {
  try {
    const { title, content, img, author } = req.body;
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    article.title = title;
    article.content = content;
    article.img = img;
    article.author = author;
    await article.save();
    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    await article.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
