//Bring in variables
const User = require('./User.js')
const Post = require('./Post.js')

User.hasMany(Post, { foreignKey: 'uid' })
Post.belongsTo(User, { as: 'u', foreignKey: 'uid' })

//Send variables out by adding them onto the object
module.exports = { User, Post	}