const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const booksRouter = require('./books');
const loansRouter = require('./loans');

module.exports = () => {
  router.get('/', function(req, res, next){
    return res.send('Yay it is working');
  });

  router.use('/users', usersRouter());
  router.use('/books', booksRouter());
  router.use('/loans', loansRouter());

  return router;
}
