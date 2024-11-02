var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
const userModel = require('./users')

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
      res.render('user', { name, email })
    })
  })

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
