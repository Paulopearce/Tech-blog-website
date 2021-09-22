//Handle how to create read update and delete posts

//Bring in a router
const router = require('express').Router()
//Bring in post model
const { Post, User } = require('../models')
//Import passport
const passport = require('passport')

//Make a get route for posts
//Between req and res and route pass passport.authenticate and tell the function which strategy to authenticate which in this case that is jwt
router.get('/posts', passport.authenticate('jwt'), (req,res) => {
  Post.findAll({include: 'u' })
  .then(posts => res.json(posts))
  .catch(err => console.log(err))
})

//Make a post route for posts
//Create, hand request body
router.post('/posts', passport.authenticate('jwt'), (req,res) => Post.create({
  title: req.body.title,
  body: req.body.body,
  uid: req.user.id
})
//That will then hand over the posts created which then is returned to the front end
  .then(post => Post.findOne({ where: { id: post.id }, include: 'u' }))
  .then(post => res.json(post))
  .catch(err => console.log(err)))

//Make a delete posts route by passing in id
//Delete where post id is the same as request params id
router.delete('/posts/:id', (req,res) => Post.destroy({where: { id: req.params.id} })
//Send success status
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))
//Export router
module.exports = router