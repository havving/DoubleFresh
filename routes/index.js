const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index'));
router.get('/login', (req, res) => res.render('login', {page:'login'}));
router.get('/signup', (req, res) => res.render('signup', {page:'signup'}));

// ★ DB connection
const mysql = require('mysql');
let connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'Having21325!',
  database: 'double_fresh'
});

connection.connect();

router.post('/signup', (req, res, next) => {
  console.log(req.body);
  const id = req.body.id;
  const password = req.body.password;
  const name = req.body.name;
  const phone = req.body.phone;

  const sql = 'INSERT INTO user(id, password, name, phone) value (?, ?, ?, ?)';
  const params = [id, password, name, phone];

  connection.query(sql, params, function(err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log(results);
    res.send('Insert Success!');
  });
});

// express test
// const app = express();
router.get('/json', (req, res) => {
  // json 형식의 데이터를 응답(반환)의 내용으로 전송
  res.json([
    {
      'id': 950821,
      'name': 'HHB'
    },
    {
      'id': 711024,
      'name': 'JBK'
    },
  ])
});

module.exports = router;