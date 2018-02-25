require('dotenv').config()

exports.mysql = {
  db_host: process.env.HOST,
  db_name: process.env.NAME,
  db_user: process.env.USER,
  db_pass: ''
};

exports.mailgun = 'key-2c6399ed00fae00dc4d26097620dd7ae'
