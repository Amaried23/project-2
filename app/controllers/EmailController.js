const express = require('express')
const router = express.Router()
let keys = require('../config/keys')
const Mailgun = require('mailgun').Mailgun;

router.post('/email', (req, res) => {

    console.log(req.body.text)


    var mg = new Mailgun(keys.mailgun);
    mg.sendText('example@example.com', ['Recipient 1 <spkellydev@gmail.com>'],
      'Email from Helping Hand',
      req.body.text,
      'noreply@example.com', {},
      function(err) {
        if (err) console.log('Oh noes: ' + err);
        else     console.log('Email Sent');
    });
    res.redirect('/login')
})

module.exports = router