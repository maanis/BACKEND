var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
const userModel = require('./users')
const jwt = require('jsonwebtoken')

router.get('/', async function (req, res, next) {
  res.render('index')
});

router.post('/register', async function (req, res, next) {
  const { name, email, password } = req.body
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const dets = await userModel.create({
        name,
        email,
        password: hash
      })
      let token = jwt.sign({ email }, 'shhh')
      res.cookie('token', token)
      res.render('user', { name, email })
    })
  })
});

router.get('/login', (req, res) => {
  res.render('login')
});

router.post('/login', async function (req, res, next) {

  const { email, password } = req.body
  let user = await userModel.findOne({ email })
  if (!user) {
    return res.status(400).send('User not found.')
  }

  

})


router.get('/logout', (req, res) => {
  res.clearCookie('token')
  res.redirect('/')
});














// // to hash a password
// router.get('/password', async function (req, res, next) {
//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash('password', salt, (err, hash) => {
//       console.log(hash)
//       req.session.pass = hash
//       res.send('bann gaya')
//     })
//   })
// });

// //to decrypt
// router.get('/decrypt', async function (req, res, next) {
//   bcrypt.compare('password', req.session.pass, (err, result) => {
//     console.log(result)
//   })

//   res.send('check')
// });



module.exports = router;
