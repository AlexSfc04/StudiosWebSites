const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Project = sequelize.define('Project', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.ENUM('restaurants', 'beauty', 'commerce', 'services', 'others'),
    defaultValue: 'others',
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
})

module.exports = Project
