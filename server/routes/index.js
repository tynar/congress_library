const express = require('express');
const path = require('path');
const BookService = require('../services/BookService');


const router = express.Router();
const usersRouter = require('./users');
const booksRouter = require('./books');
const loansRouter = require('./loans');

module.exports = () => {
  const bookService = new BookService(path.join(__dirname, '../data/books.json'));

  router.get('/', function(req, res, next){
    return res.render('index');
  });

  router.use('/users', usersRouter());
  router.use('/books', booksRouter(bookService));
  router.use('/loans', loansRouter());

  return router;
}
