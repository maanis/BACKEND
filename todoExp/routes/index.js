var express = require('express');
var router = express.Router();
let data = []
let value = ''

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { data: data, value: value });
});

router.post('/createTodo', function (req, res, next) {
  if (req.body.task != '') {
    let task = req.body.task
    data.push(task)
  }
  res.redirect('/')
});

router.get('/edit/:id', (req, res) => {
  const task = data.findIndex(task => task.id === req.params.id);
  console.log(task)
  if (task) {
    res.render('edit', { task });
  } else {
    // res.redirect('/');
  }
});

router.post('/edit/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTitle = req.body.title;

  // Find task and update its title
  data = data.map(task =>
    task.id == taskId ? { ...task, title: updatedTitle } : task
  );

  res.redirect('/');
});

router.get('/del/:slug', function (req, res, next) {
  data.splice(`${req.params.slug}`, 1)
  console.log(data)
  res.redirect('/')
});





module.exports = router;
