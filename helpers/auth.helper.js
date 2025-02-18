const User = require('../models/user.model')
const bcrypt = require("bcrypt");
const { ValidationError } = require("sequelize");
const jwt = require('jsonwebtoken');

module.exports.adminLogin = async (login) => {
    try {
      const user = await User.findOne({ where: { email: login.email, isAdmin: true } });
  
      if (!user) {
        throw new Error("user_not_exists"); // Throw specific error for user not found
      }
  
      const isPasswordValid = await decryptPassword(login.password, user.password);
  
      if (!isPasswordValid) {
        throw new Error("invalid_password"); // Throw specific error for invalid password
      }
  
      const token = createToken(user);
      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin
        },
      };
    } catch (error) {
      throw error; // Rethrow the error without wrapping it in a new Error
    }
  };

  function createToken(user){
    return jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.isAdmin, 
        },
        process.env.JWT_SECRET,
        { expiresIn: '3h' }
      );
}

module.exports.createAdmin = async (user) => {
  try {
    user.isAdmin = true;
    user.phone = '0000000000'
    const cryptedPass = await cryptPassword(user.password);
    user.password = cryptedPass;
    return await User.create(user);
  } catch (error) {
    if (error instanceof ValidationError) {
      if (error.errors && error.message.includes("email")) {
        throw Error("email_exists");
      }
      if (error.errors && error.message.includes("phone")) {
        throw Error("phone_exists");
      }
      throw Error(error.message);
    }

    if (error instanceof Sequelize.DatabaseError) {
      throw Error("Database connection error. Please try again later.");
    }

    throw Error({ error });
  }
};

async function decryptPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

async function cryptPassword(password) {
  return bcrypt.hash(password, 10);
}