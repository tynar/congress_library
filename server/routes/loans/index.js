const express = require('express');
const router = express.Router();

module.exports = (param) => {

  const loanService = param;

  router.get('/', async function(req, res, next){

    const allLoans = await loanService.getAllLoans();

    return res.render('loans', {
      loans: allLoans
    });
  });

  router.get('/:id', function(req, res, next){
    return res.send('Page for loan with id ' + req.params.id);
  });

  return router;
}