const express = require('express');
const router = express.Router();

module.exports = (param) => {

  const userService = param;

  router.get('/', async function(req, res, next){

    const allUsers = await userService.getAllUsers();

    return res.render('users', {
      users: allUsers
    });
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