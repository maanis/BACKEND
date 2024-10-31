var express = require('express');
var router = express.Router();
var userModel = require('./users')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index')
});


router.post('/create', async function (req, res, next) {
  let { username, email, imgurl } = req.body
  let data = await userModel.create({
    username,
    email,
    imgurl
  })
  // console.log(data)
  res.redirect('user')
});

router.get('/user', async (req, res) => {
  let alldata = await userModel.find()
  res.render('user', { data: alldata })

})

router.get('/del/:id', async (req, res) => {
  let delData = await userModel.findOneAndDelete({ _id: req.params.id })
  res.redirect('/user')
})


router.get('/edit/:id', async (req, res) => {
  let userDetails = await userModel.findOne({ _id: req.params.id })
  res.render('edit', { data: userDetails })
})

router.post('/editedUser/:id', async (req, res) => {
  let editedUser = await userModel.findOneAndUpdate({ _id: req.params.id }, { username: req.body.name, email: req.body.email, imgurl: req.body.imgurl }, { new: true })
  res.redirect('/user')
})







module.exports = router;
