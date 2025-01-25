const { DataTypes } = require('sequelize');
const sequelize = require('../database/connect');
const { v4: uuidv4 } = require('uuid');

const Media = sequelize.define('Media', {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM,
    values: ['image', 'video', 'audio'],
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Media;
