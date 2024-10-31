var express = require('express');
var router = express.Router();


let data = []
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/form', function (req, res, next) {
  res.render('form');
});

router.post('/submit', function (req, res, next) {
  // console.log(req.body.title)
  let obj = {
    title: req.body.title,
    body: req.body.body
  }
  data.push(obj)
  res.render('submitPage', { data })
});

module.exports = router;
