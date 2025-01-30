const bcrypt = require('bcrypt');
const User = require("../models/user.model");
const { ValidationError } = require("sequelize");
const Sequelize = require("sequelize");

async function cryptPassword (password) {
  return bcrypt.hash(password, 10); 
}

async function decryptPassword (password, hash) {
    return bcrypt.compare(password, hash); 
}

module.exports.create = async (user) =>{
    try {
        user.isAdmin = false;
        user.password = await cryptPassword(generatePassword());
        
        const createdUser = await User.create(user);
        return createdUser;
    } catch (error) {
    
        if (error instanceof ValidationError) {
            if (error.errors && error.message.includes('email')) {
                throw Error('email_exists');
            }
            if (error.errors && error.message.includes('phone')) {
                throw Error('phone_exists');
            }
            throw Error(error.message);

        }

        if (error instanceof Sequelize.DatabaseError) {
            throw Error('Database connection error. Please try again later.');
        }

        throw Error({error});
    }
}

module.exports.getAll = async ()=>{
    return User.findAll();
  }

function generatePassword() {
    const length = 8;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    
    return password;
  }