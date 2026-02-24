const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Article = sequelize.define('Article', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  excerpt: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.ENUM('web-design', 'digital-marketing', 'seo', 'business-tips', 'trends'),
    defaultValue: 'web-design',
  },
  author: {
    type: DataTypes.STRING,
    defaultValue: 'SWS Team',
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
})

module.exports = Article
