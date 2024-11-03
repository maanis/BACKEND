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
  let user = await userModel.findOne({ email })
  if (user) {
    return res.send('user already exist')
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const dets = await userModel.create({
        name,
        email,
        password: hash
      })
      let token = jwt.sign({ email, name }, 'shhh')
      res.cookie('token', token)
      res.redirect('profile')
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
  bcrypt.compare(password, user.password, (err, result) => {
    console.log(result)
    if (result) {
      let token = jwt.sign({ email, name: user.name }, 'shhh')
      res.cookie('token', token)
      res.redirect('profile')
    }
    else {
      res.send('somethimg went wrong')
    }
  })
})

router.get('/profile', isLoggedIn, (req, res) => {
  console.log(req.data)
  res.render('profile', { name: req.data.name, email: req.data.email })
});
router.get('/logout', (req, res) => {
  res.cookie("token", "")
  res.redirect('/')
});


function isLoggedIn(req, res, next) {
  if (req.cookies.token === "") {
    res.send('you must be log in')
  } else {
    let data = jwt.verify(req.cookies.token, "shhh")
    req.data = data
    next()
  }
}













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
