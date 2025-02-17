const Media = require("../models/media.model");

module.exports.create = async (req, res) => {
  try {
    const { title, type, url } = req.body;
    const media = await Media.create({ title, type, url });
    res.status(201).json(media);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const { type, page = 1, limit = 20 } = req.query;

    // Calculate offset based on the page and limit
    const offset = (page - 1) * limit;

    // Build the where conditions dynamically based on query parameters
    const whereConditions = {};
    if (type) {
      whereConditions.type = type; // Filter by type if provided
    }

    const media = await Media.findAll({
      where: whereConditions,
      limit: Number(limit),
      offset: offset,  // Pagination offset
    });

    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getById = async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) {
      return res.status(404).json({ error: "Media not found" });
    }
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.update = async (req, res) => {
  try {
    const { title, type, url } = req.body;
    const media = await Media.findByPk(req.params.id);
    if (!media) {
      return res.status(404).json({ error: "Media not found" });
    }
    media.title = title;
    media.type = type;
    media.url = url;
    await media.save();
    res.status(200).json(media);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) {
      return res.status(404).json({ error: "Media not found" });
    }
    await media.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
