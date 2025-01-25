const userHelper = require("../helpers/user.helper");
const { ADMIN_PASS } = process.env;

module.exports.create = async (req, res) => {
    try{
        const user = await userHelper.create(req.body);
        return res.status(201).json(user);
    }catch(error){
        console.log(error)
        return res.status(500).json({message: error.message ? error.message : error});
    }
}

module.exports.createAdmin = async (req, res) => {
    try{
        if(req.headers.adminpass != ADMIN_PASS) 
            return res.status(401).json({message: 'Unauthorized'});
        const user = await userHelper.createAdmin(req.body);
        return res.status(201).json(user);
    }catch(error){
        console.log(error)
        return res.status(500).json({message: error.message ? error.message : error});
    }
}

module.exports.adminLogin = async (req, res) => {
    try {
      const user = await userHelper.adminLogin(req.body);
      return res.status(200).json(user); // Use 200 for successful login
    } catch (error) {
      // Handle specific errors with appropriate status codes
      if (error.message === "user_not_exists" || error.message === "invalid_password") {
        return res.status(400).json({ message: error.message }); // 400 for client-side errors
      } else {
        return res.status(500).json({ message: "Internal server error" }); // 500 for server-side errors
      }
    }
  };