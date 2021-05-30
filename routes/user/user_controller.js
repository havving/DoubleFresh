exports.users = (req, res, next) => {
    res.send('Respond with a resource');
}

exports.signup = (req, res, next) => {
    res.render('signup', {page: 'signup'})
}

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

exports.signup_insert = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('flutter!')
    console.log(req.body);
    const id = req.body.id;
    const password = req.body.password;
    const name = req.body.name;
    const phone = req.body.phone;

    const sql = 'INSERT INTO user(id, password, name, phone) value (?, ?, ?, ?)';
    const params = [id, password, name, phone];

    connection.query(sql, params, function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        console.log(results);
        res.send('Insert Success!');
    });
}