const User = require("../models/user.model");
const userHelper = require("../helpers/user.helper");
const { ValidationError } = require("sequelize");
module.exports.create = async (req, res) => {
    try {
        const user = req.body;
        user.password = await userHelper.cryptPassword(user.password);
        
        const createdUser = await User.create(req.body);
        res.status(201).json({success: true, data: createdUser});
    } catch (error) {
        // Custom error handling
        if (error instanceof ValidationError) {
            if (error.errors && error.message.includes('email')) {
                return res.status(400).json({ success: false, error: 'Email already exists.' });
            }
            return res.status(400).json({ success: false, error: error.message });
        }

        if (error instanceof Sequelize.DatabaseError) {
            return res.status(500).json({ success: false, error: 'Database connection error. Please try again later.' });
        }

        return res.status(500).json({ success: false, error: 'An unexpected error occurred.' });
    }
}