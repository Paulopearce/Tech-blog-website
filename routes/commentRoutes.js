const router = require('express').Router()
//Bring in post model
const { Post, User, Comment } = require('../models')
//Import passport
const passport = require('passport')

router.get('/users/comments', (req,res) => {
  Post.findAll({include: 'u' })
  .then(posts => res.json(posts))
  .catch(err => console.log(err))
})

router.post('/comments', passport.authenticate('jwt'), (req,res) => {
  let d = new Date()
  Post.create({
    title: req.body.title,
    body: req.body.body,
    uid: req.user.id,
    date: `${d.getMonth()+1}-${d.getDate()}`
  })
  .then(post => Post.findOne({ where: { id: post.id }, include: 'u' }))
  .then(post => res.json(post))
  .catch(err => console.log(err))
})

module.exports = router