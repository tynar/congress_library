const express = require('express');
const router = express.Router();

module.exports = () => {
  router.get('/', function(req, res, next){
    return res.render('users');
  });

  router.get('/add', (req, res, next) => {
    return res.render('users/add');
  });

  router.post('/', (req, res, next) => {
    console.log(req.body);
    return res.redirect('/users?added=true');
  });

  router.get('/:id', function(req, res, next){
    return res.send('Page for user with id ' + req.params.id);
  });

  return router;
}