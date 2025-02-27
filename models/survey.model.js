const { DataTypes } = require('sequelize');
const sequelize = require('../database/connect');
const { v4: uuidv4 } = require('uuid');
const Question = require('./question'); // Import Question model for association

const Survey = sequelize.define(
  'Survey',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

// Association with Question model
Survey.hasMany(Question, { foreignKey: 'surveyId', as: 'questions' });
Question.belongsTo(Survey, { foreignKey: 'surveyId' });

module.exports = Survey;
