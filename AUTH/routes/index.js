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
router.get('/set-session', (req, res) => {
  req.session.age = 12;
  req.session.username = 'manish';
  // Setting a session variable
  res.send('Session variable set');
});

router.get('/read', function (req, res, next) {
  console.log(object)
  console.log(req.session.username)
  res.send('check kar bhava')
});




module.exports = router;
