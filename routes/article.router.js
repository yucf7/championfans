const express = require('express');
const articleController = require('../controllers/article.controller')
const router = express.Router();

// Create an article
router.post('',articleController.create);

// Get all articles
router.get('', articleController.getAll);

// Get a single article by ID
router.get('/:id', articleController.getById);

// Update an article
router.put('/:id', articleController.update);

// Delete an article
router.delete(':id', articleController.delete);

module.exports = router;