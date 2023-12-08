const express = require('express');
require('dotenv').config();
var index = require('./routes/index');
var shopify = require('./routes/shopify');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const CONFIG = require('./config/config');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', index);
app.use('/shopify', shopify);

const db =  require('./services/db');


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.render('error');
    res.json({
        message: err.message,
        error: err
      });
});

module.exports = app;