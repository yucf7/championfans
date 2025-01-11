const User = require("../models/user.model");

module.exports.create = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({success: true, data: user});
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}