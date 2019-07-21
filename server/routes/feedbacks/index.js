const express = require('express');
const router = express.Router();

module.exports = (param) => {

  const feedbackService = param;

  router.get('/', async function(req, res, next){

    const allFeedbacks = await feedbackService.getAllFeedbacks();

    var msg = req.flash('flash') || {};

    return res.render('feedbacks', {
      feedbacks: allFeedbacks,
      success: msg.success,
      error: msg.error,
      message: msg.message
    });
  });

  router.get('/add', (req, res, next) => {
    var msg = req.flash('flash') || {};

    return res.render('feedbacks/add', {
      success: msg.success,
      error: msg.error,
      message: msg.message
    });
  });

  router.post('/', async (req, res, next) => {

    //Validate
    const email = req.body.faEmail.trim();
    const name = req.body.faName.trim();
    const message = req.body.faMessage.trim();
   
    var msg = {
      success: true,
      error: false,
      message: 'Successfully added.'
    };

    if (!email || !name || !message ) 
    {
      msg = {
        success: false,
        error: true,
        message: 'Please fill email, name and message fields.'
      };

      req.flash('flash', msg);
      return res.redirect('/feedbacks/add');
    }

    await feedbackService.addFeedback({
      email: email,
      name: name,
      message: message
    });

    var msg = {
      success: true,
      error: false,
      message: 'Successfully added.'
    };

    req.flash('flash', msg);
    return res.redirect('/feedbacks');
  });

  router.post('/delete', async (req, res, next) =>{
    const id = req.body.id;
    
    /* *****************************IMPLEMENT HERE*********************************/

    var msg = {
      success: true,
      error: false,
      message: 'Successfully deleted.'
    };

    if (id == 'undefined') {
      var msg = {
        success: false,
        error: true,
        message: 'ID was not provided'
      };

      req.flash('flash', msg);
      return res.redirect('/feedbacks');
    }

    req.flash('flash', msg);
    return res.redirect('/feedbacks');

  } );

  router.get('/update/:id', async (req, res, next) =>{

    var feedback = await feedbackService.getFeedback(req.params.id);

    var msg = req.flash('flash') || {};

    return res.render('feedbacks/update', {
      feedback,
      success: msg.success,
      error: msg.error,
      message: msg.message
    });
  });

  router.post('/update', async (req, res, next)=>{
    //Validate
    const id = req.body.faId;
    const email = req.body.faEmail.trim();
    const name = req.body.faName.trim();
    const message = req.body.faMessage.trim();
   
    var msg = {
      success: true,
      error: false,
      message: 'Successfully updated.'
    };

    if (!id || !email || !name || !message ) 
    {
      msg = {
        success: false,
        error: true,
        message: 'Please fill email, name and message fields.'
      };

      req.flash('flash', msg);
      return res.redirect(`/feedbacks/update/${id}`);
    }

    await feedbackService.updateFeedback({
      id: id,
      email: email,
      name: name,
      message: message
    });

    req.flash('flash', msg);
    return res.redirect('/feedbacks');

  });

  return router;
}