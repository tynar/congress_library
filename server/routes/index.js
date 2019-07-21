const express = require('express');
const path = require('path');
const BookService = require('../services/BookService');
const UserService = require('../services/UserService');
const LoanService = require('../services/LoanService');
const FeedbackService = require('../services/FeedbackService');


const router = express.Router();
const usersRouter = require('./users');
const booksRouter = require('./books');
const loansRouter = require('./loans');
const feedbacksRouter = require('./feedbacks');


module.exports = () => {
  const bookService = new BookService();
  const userService = new UserService();
  const loanService = new LoanService();
  const feedbackService = new FeedbackService(path.join(__dirname, '../data/feedbacks.json'));


  router.get('/', function(req, res, next){
    return res.render('index');
  });

  router.use('/users', usersRouter(userService));
  router.use('/books', booksRouter(bookService));
  router.use('/loans', loansRouter(loanService));
  router.use('/feedbacks', feedbacksRouter(feedbackService));


  return router;
}
