var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var postModel = require('../models/posts');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const upload = require('../config/multerConfig')

router.get('/', function (req, res) {
  res.render('index')
});

router.post('/register', async function (req, res) {

  const { email, name, username, password } = req.body;
  let user = await userModel.findOne({ email });
  if (user) {
    return res.status(400).json({ error: 'user already exists' });
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let user = await userModel.create({
        name,
        email,
        username,
        password: hash
      })

      let token = jwt.sign({ email, username }, 'secret')
      res.cookie('token', token)

      res.redirect('profile')

    })
  })

});


router.get('/login', function (req, res) {
  res.render('login')
});

router.post('/login', async function (req, res) {
  const { email, password } = req.body
  let user = await userModel.findOne({ email })

  if (!user) return res.status(200).send('something went wrong')

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email, username: user.username }, 'secret')
      res.cookie('token', token)
      res.redirect('profile')
    } else {
      res.send('Incorrect Username or Password')
    }
  })
});

router.get('/profile', isLoggedIn, function (req, res) {
  const { email, name, username, imgurl, bio } = req.data
  console.log(req.data)
  res.render('profile', { email, name, username, imgurl, bio })
});


router.get('/edit', isLoggedIn, function (req, res) {
  res.render('edit')
});

router.post('/edit', isLoggedIn, upload.single('pfp'), async function (req, res) {
  const { name, username, bio } = req.body
  const { filename } = req.file
  await userModel.findOneAndUpdate({ email: req.data.email }, { name, username, bio })
  let user = await userModel.findOne({ email: req.data.email })
  user.imgurl = filename
  await user.save()
  res.redirect('profile')
});

router.get('/logout', function (req, res) {
  res.cookie('token', "")
  res.redirect('login')
});

async function isLoggedIn(req, res, next) {
  if (req.cookies.token === '') {
    res.send('you must log in')
  } else {
    let data = jwt.verify(req.cookies.token, 'secret')
    let user = await userModel.findOne({ email: data.email })
    req.data = user
    next()
  }
}

module.exports = router;
