const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const cors = require('cors');
app.use(cors());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
}
app.use(cors(corsOptions));

// ★ index.js에서 routes 관리
const routes = require('./routes');
app.use('/', routes);

// ★ view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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


// test
app.get('/', function(req,res){
  res.header("Access-Control-Allow-Origin", "*");
  console.log('---get방식이 구동되었습니다.---');
  const text = 'get으로 나타나는 데이터!';
  console.log("전송데이터 : " + text)
  res.send(text);
});

app.post('/data', function(req,res){
  res.header("Access-Control-Allow-Origin", "*");
  const data  = req.body;

  console.log('---post방식이 구동되었습니다.---');
  console.log(data);
  const text = data.id + ' ' + data.name + ' ' + data.age + '살';
  console.log("전송데이터 : " + text)
  res.send(text);
});


module.exports = app;
