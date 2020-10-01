var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.enable('trust proxy');
app.use(function(request, response, next) {
  if (process.env.NODE_ENV === 'production' && !request.secure) {
     return response.redirect("https://" + request.headers.host + request.url);
  }
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development

  const model = {
    title: 'Error',
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  };
  res.locals = { model };

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
