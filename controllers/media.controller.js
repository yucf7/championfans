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
    const { lastId, limit = 10 } = req.query; // `lastId` to get the next set of records
    const offset = lastId ? { where: { id: { [Op.gt]: lastId } } } : {};

    const media = await Media.findAll({
      limit: Number(limit),
      ...offset,
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
