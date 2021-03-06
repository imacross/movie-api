const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

//middleware include
const verifyToken = require('./middleware/verify-token.js');


//--movie route bağlantısı
const movie = require('./routes/movie.js'); //movie değişkenine routesı atadım
const director = require('./routes/director.js'); //movie değişkenine routesı atadım



//--db connection

const db = require('./helper/db.js')(); //sonuna() eklediğimiz için fonksiyon direk çalışıyor
//config js
const config = require('./config.js');
app.set('api_secret_key', config.api_secret_key);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //burayı true yaptım
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api',verifyToken);//tüm istekler ilk burdan geçer
app.use('/api/movies', movie); // movie route u /api/movie ye bağladım
app.use('/api/directors', director); // movie route u /api/movie ye bağladım
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: { message: err.message, code: err.code } });
});

module.exports = app;
