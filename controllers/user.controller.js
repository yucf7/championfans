const userHelper = require("../helpers/user.helper");
const { ADMIN_PASS } = process.env;

module.exports.create = async (req, res) => {
  try {
    const user = await userHelper.create(req.body);
    return res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message ? error.message : error });
  }
};

module.exports.getAll = async (req, res) => {
  const isAdmin = req.query.admin;
  try {
    const users = await userHelper.getAll(isAdmin);
    const cleanUsers = users.map(({ dataValues }) => {
      const { password, ...user } = dataValues;
      return user;
    });

    return res.status(200).json(cleanUsers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" }); // 500 for server-side errors
  }
};

module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userHelper.deletUser(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};