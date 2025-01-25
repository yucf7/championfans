const express = require('express');
const mediaController = require('../controllers/media.controller')
const router = express.Router();

// Create a media entry
router.post('', mediaController.create);

// Get all media entries with infinite scroll
router.get('', mediaController.getAll);

// Get a single media entry by ID
router.get('/:id', mediaController.getById);

// Update a media entry
router.put('/:id', mediaController.update);

// Delete a media entry
router.delete('/:id', mediaController.delete);

module.exports = router;
