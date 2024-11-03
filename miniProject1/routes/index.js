var express = require('express');
var router = express.Router();
var userModel = require('../app/users');
var postModel = require('../app/posts');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.get('/', function (req, res) {
  res.render('index')
});

module.exports = router;
