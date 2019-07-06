const express = require('express');
const router = express.Router();

module.exports = () => {
  router.get('/', function(req, res, next){
    return res.render('books');
  });

  router.get('/:id', function(req, res, next){
    return res.send('Page for book with id ' + req.params.id);
  });

  return router;
}