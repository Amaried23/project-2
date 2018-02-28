require('dotenv').config()

exports.mysql = {
  db_host: process.env.HOST,
  db_name: process.env.NAME,
  db_user: process.env.USER,
  db_pass: ''
};

exports.mailgun = process.env.MAILGUN

exports.stripe = process.env.STRIPE
