const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

const index = require('./routes/index');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(require('cors')())


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.get("/get",(req, res)=>{
  res.status(200).json({hare : 'krishna'})
})


app.post("/message", (req, res)=>{
  try {
    pusher.trigger("my-channel", "my-event", {
      message: "hello world"
    });
    res.status(200).json({success : true})
  } catch (error) {
    pusher.trigger("my-channel", "my-event", {
      message: "hello world"
    });
    res.status(200).json({success : false})
  }
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

const pusher = new Pusher({
  appId: "1835937",
  key: "3a6f9cddeda99b45c52b",
  secret: "a89ea55e3399441a205f",
  cluster: "ap2",
  useTLS: true
});






app.use(bodyParser.json());


// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
