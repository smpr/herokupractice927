require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI); 
var index = require('./routes/index');
const methodOverride = require('method-override')

 const db = mongoose.connection
 db.on('error', (error)=>{
   console.log(error)
 })
 db.once('open', ()=>{
   console.log("Conected to mongodb")
 })
var app = express();
app.use(methodOverride('_method'))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//displays db information!!! pay attention!!

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const companyController = require('./routes/companyController.js')
const snowboardController = require("./routes/snowboardController.js")
app.use('/companies', companyController)
//this takes the company id and takes all the snowboards from it in the db and posts it
app.use('/companies/:companyId/snowboards', snowboardController)
app.use('/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
