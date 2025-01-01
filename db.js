const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', // host database Anda
  user: 'root', // username MySQL Anda
  password: '', // password MySQL Anda (kosong secara default)
  database: 'mydatabase'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = connection;