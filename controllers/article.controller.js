const Article = require("../models/article.model");
const Media = require("../models/media.model");

module.exports.create = async (req, res) => {
  try {
    const { title, content, img, author } = req.body;
    const article = await Article.create({ title, content, img, author });
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const { lastId, limit = 10 } = req.query;
    const offset = lastId ? { where: { id: { [Op.gt]: lastId } } } : {};

    const articles = await Article.findAll({
      limit: Number(limit),
      ...offset,
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
