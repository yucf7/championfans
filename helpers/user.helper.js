const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { ValidationError } = require("sequelize");
const Sequelize = require("sequelize");
const jwt = require('jsonwebtoken');

async function cryptPassword(password) {
  return bcrypt.hash(password, 10);
}

async function decryptPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports.create = async (user) => {
  try {
    user.isAdmin = false;
    user.password = await cryptPassword(generatePassword());

    const createdUser = await User.create(user);
    return createdUser;
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

module.exports.createAdmin = async (user) => {
  try {
    user.isAdmin = true;
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
        },
      };
    } catch (error) {
      throw error; // Rethrow the error without wrapping it in a new Error
    }
  };

  module.exports.getAll = async ()=>{
    return User.findAll();
  }

function createToken(user){
    return jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: 'admin', 
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
}
function generatePassword() {
  const length = 8;
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
}
