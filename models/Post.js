//Define what consitutes a post on this blog

//bring in Model and dataTypes
const { Model, DataTypes } = require('sequelize')
//Bring in sequelize connection
const sequelize = require('../db')

//create class Post that Extends Model
class Post extends Model { }
//Initialize Post with some columns
Post.init({
  //give title and body
  title: DataTypes.STRING,
  body: DataTypes.STRING,
  date: DataTypes.STRING
  //Pass in sequelize connection and modelName
}, { sequelize, modelName: 'post' })
//Export Post
module.exports = Post

