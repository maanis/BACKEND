var express = require('express');
var router = express.Router();
const session = require('express-session')

router.get('/', async function (req, res, next) {
  res.render('index')
});

//cookies
// router.get('/set', async function (req, res, next) {
//   res.cookie('name', 'manish')
//   res.send('created')
// });

// router.get('/read', async function (req, res, next) {
//   console.log(req.cookies.name)
//   res.send('check kar bhava')
// });

// router.get('/delete', async function (req, res, next) {
//   res.clearCookie('name')
//   console.log(req.cookies)
//   res.send('deleted')
// });


//session
// router.get('/set', (req, res) => {
//   req.session.age = 12;
//   req.session.username = 'manish';
//   // Setting a session variable
//   res.send('Session variable set');
//   console.log(req.session)
// });

// router.get('/read', function (req, res, next) {
//   console.log(req.session.username)
//   res.send('check kar bhava')
// });

// router.get('/delete', function (req, res, next) {
//   req.session.destroy()
//   console.log(req.session)
//   res.send('check kar bhava')
// });


//flash
router.get('/set', (req, res) => {
  req.flash('name', 'manish')
  req.flash('name', { name: 'manish', age: 21, ban: false })
  res.send('bann gaya')
});

router.get('/get', (req, res) => {
  console.log(req.flash('name'));
  res.send('bann gaya')
});






module.exports = router;
