var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var myview = require('./routes/myview');

//REST APIS
var rank = require('./routes/rest/show_rank') ;

var app = express();
console.log("this is how the dirname outputs ", __dirname);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
//então, quando esta rota:"/myview", for chamada no endereço
//o ARQUIVO ./routes/myview.js será executado 
//então as regras da ordem de execução dos middlewares continua valendo
app.use('/myview', myview);
app.use('/myview/database', myview);
app.use('/show_rank', rank);

//inline getting router
app.get('/anotherroute', function(req,res){
    // var router  = express.Router();
    res.render("myview");
    });
// console.log(myview);

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
