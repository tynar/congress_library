const express = require('express');
const router = express.Router();

module.exports = (param) => {

  const userService = param;

  router.get('/', async function(req, res, next){

    const allUsers = await userService.getAllUsers();

    const added = req.query.added
    const addResult = {
      success: added === 'true',
      error: added ==='false'
    }

    return res.render('users', {
      users: allUsers,
      addResult: addResult
    });
  });

  router.get('/add', (req, res, next) => {
    const added = req.query.added
    const addResult = {
      success: added === 'true',
      error: added ==='false'
    }

    return res.render('users/add', {
      addResult: addResult
    });
  });

  router.post('/', async (req, res, next) => {

    //Validate
    const email = req.body.uaEmail.trim();
    const password = req.body.uaPassword.trim();
    const address = req.body.uaAddress.trim();
    const address2 = req.body.uaAddress2.trim();
    const city = req.body.uaCity.trim();
    const zip = req.body.uaZip.trim();

    if (!email || !password ) return res.redirect('/users/add?added=false');

    await userService.addUser({
      email: email,
      password,
      address2,
      address,
      city,
      zip
    });

    return res.redirect('/users?added=true');
  });

  router.get('/:id', function(req, res, next){
    return res.send('Page for user with id ' + req.params.id);
  });

  return router;
}