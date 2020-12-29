const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const passport = require('passport');
const session = require('express-session');
//route
const Router = require('./routes/index');


// const auth= require('./mw/auth');

const app = express();

// Chỉ tải database một lần, khi khởi động app
mongoose.connect('mongodb://localhost/eadb',{ useNewUrlParser: true ,useUnifiedTopology: true})
    .then(() => console.log('DB connected...'))
    .catch(err => console.log('Cannot connect to DB...', err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Xác thực tất cả req:
// app.use(auth);

// bắt đầu cho passport:=========
app.use(session({
  secret : "secret",
  saveUninitialized: true,
  resave: true
}))

app.use(passport.initialize());
app.use(passport.session());
//=================================

// Gán địa chỉ
app.use('/', Router);
// app.use('/user', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8000, () => {
  console.log(`port 8000`)
})
module.exports = app;
