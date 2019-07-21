const express = require('express');
const createError = require('http-errors');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');
const app = express();
const port = 3000;

app.locals.pretty = true;
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/favicon.ico', (req, res, next) => {
  return res.sendStatus(204);
});

app.use('/', routes());

app.use((req, res, next) => {
  return next(createError(404, 'File not found.'));
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.locals.status = status;
  res.status(status);
  res.locals.message = status.toString() + ' ' + err.message;
  return res.render('error');
});

app.listen(port, function(){
  console.log('Web server started on port ' + port);
});