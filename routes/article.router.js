const express = require('express');
const Article = require('../models/article.model');
const router = express.Router();

// Create an article
router.post('', async (req, res) => {
  try {
    const { title, content, img, author } = req.body;
    const article = await Article.create({ title, content, img, author });
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all articles
router.get('', async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an article
router.put(':id', async (req, res) => {
  try {
    const { title, content, img, author } = req.body;
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
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
});

// Delete an article
router.delete(':id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    await article.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;