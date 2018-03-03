const express = require('express');
const router = express.Router();
let keys = require('../config/keys');
const Mailgun = require('mailgun').Mailgun;
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
      api_key: keys.mailgun,
      domain: 'sandbox643fe2531cc54b16b93ee92e1a51ea94.mailgun.org'
    },
    proxy: 'http://user:pass@localhost:8080' // optional proxy, default is false
}


router.post('/email/signup', (req, res) => {
    let nodemailerMailgun = nodemailer.createTransport(mg(auth));

    let text = {
        text: req.body.text
    }

    nodemailerMailgun.sendMail({
        from: 'myemail@example.com',
        to: 'spkellydev@gmail.com', // An array if you have multiple recipients.
        subject: 'Hey you, awesome!',
        template: {
          name: 'app/views/emails/signup.hbs',
          engine: 'handlebars',
          context: text
        }
      }, function (err, info) {
        if (err) {
          console.log('Error: ' + err);
        }
        else {
            console.log('Response: ' + JSON.stringify(info));
        }
      });

      console.log('success')

    res.redirect('/login')
})

module.exports = router
