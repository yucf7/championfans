const userHelper = require("../helpers/user.helper");

module.exports.create = async (req, res) => {
    try{
        const user = await userHelper.create(req.body);
        return res.status(201).json(user);
    }catch(error){
        return res.status(500).json({message: error});
    }
}