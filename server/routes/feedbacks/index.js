const express = require('express');
const router = express.Router();

module.exports = (param) => {

  const feedbackService = param;

  router.get('/', async function(req, res, next){

    const allFeedbacks = await feedbackService.getAllFeedbacks();

    const added = req.query.added
    const addResult = {
      success: added === 'true',
      error: added ==='false'
    }


    return res.render('feedbacks', {
      feedbacks: allFeedbacks,
      addResult: addResult
    });
  });

  router.get('/add', (req, res, next) => {
    const added = req.query.added
    const addResult = {
      success: added === 'true',
      error: added ==='false'
    }

    return res.render('feedbacks/add', {
      addResult: addResult
    });
  });

  router.post('/', async (req, res, next) => {

    //Validate
    const email = req.body.uaEmail.trim();
    const name = req.body.uaName.trim();
    const message = req.body.uaMessage.trim();
   
    if (!email || !name || !message ) return res.redirect('/feedbacks/add?added=false');

    await feedbackService.addFeedback({
      email: email,
      name: name,
      message: message
    });

    return res.redirect('/feedbacks?added=true');
  });

  return router;
}