const userHelper = require("../helpers/user.helper");
const { ADMIN_PASS } = process.env;

module.exports.create = async (req, res) => {
    try{
        const user = await userHelper.create(req.body);
        return res.status(201).json({success: true});
    }catch(error){
        console.log(error)
        return res.status(500).json({message: error.message ? error.message : error});
    }
}



  module.exports.getAll = async (req, res) => {
    try {
      const users = await userHelper.getAll();
      return res.status(200).json(users); // Use 200 for successful login
    } catch (error) {
      // Handle specific errors with appropriate status codes
        return res.status(500).json({ message: "Internal server error" }); // 500 for server-side errors
    }
  };