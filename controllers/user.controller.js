const userHelper = require("../helpers/user.helper");
const { ADMIN_PASS } = process.env;

module.exports.create = async (req, res) => {
  try {
    const user = await userHelper.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message ? error.message : error });
  }
};

module.exports.getAll = async (req, res) => {
  try {
    if (req.headers.adminpass != ADMIN_PASS)
      return res.status(401).json({ message: "Unauthorized" });
    const users = await userHelper.getAll();
    return res.status(200).json(users); // Use 200 for successful login
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error" }); 
  }
};
