const { DataTypes } = require('sequelize');
const sequelize = require('../database/connect');
const { v4: uuidv4 } = require('uuid');
const Survey = require('./survey'); // Import Survey model for association

const Question = sequelize.define(
  'Question',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    surveyId: {
      type: DataTypes.UUID,
      references: {
        model: Survey,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('multiple-choice', 'text'),
      allowNull: false,
    },
    choices: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Used only for multiple-choice
      allowNull: true, // Choices can be null if the question type is not 'multiple-choice'
    },
    required: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

// Association with Survey model
Survey.hasMany(Question, { foreignKey: 'surveyId', as: 'questions' });
Question.belongsTo(Survey, { foreignKey: 'surveyId' });

module.exports = Question;
