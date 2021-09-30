const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Comment extends Model { }

Comment.init({
  body: DataTypes.STRING
}, { sequelize, modelName: 'comment' })

module.exports = Comment