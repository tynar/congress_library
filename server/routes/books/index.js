const express = require('express');
const router = express.Router();

module.exports = (param) => {

  const bookService = param;

  router.get('/', async function(req, res, next){

    const books = await bookService.getBooks();

    return res.render('books', {
      books
    });
  });

  router.get('/:id', async function(req, res, next){

    const bookDetails = await bookService.getBookDetails(req.params.id);

    return res.render('bookDetails', {
      bookDetails: bookDetails
    });
  });

  return router;
}