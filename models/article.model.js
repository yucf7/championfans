const { DataTypes } = require('sequelize');
const sequelize = require('../database/connect');
const { v4: uuidv4 } = require('uuid');

const Article = sequelize.define('Article', {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  views: {
    type: DataTypes.BIGINT,
    allowNull: true,
  }
}, {
  timestamps: true,
});

module.exports = Article;