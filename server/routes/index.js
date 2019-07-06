const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const booksRouter = require('./books');
const loansRouter = require('./loans');

module.exports = () => {
  router.get('/', function(req, res, next){
    return res.render('index');
  });

  router.use('/users', usersRouter());
  router.use('/books', booksRouter());
  router.use('/loans', loansRouter());

  return router;
}
