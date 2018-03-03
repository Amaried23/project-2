const express = require('express')
const passport   = require('passport')
const stripeKey = require('./app/config/keys').stripe
const session    = require('express-session')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')
const db = require('./app/models')
const PORT = process.env.PORT || 3000
const app = express()
const faker = require('faker')
var stripe = require("stripe")(stripeKey);
const env        = require('dotenv').load()

//Handlebars View Engine
app.engine('hbs', exphbs({
	defaultLayout: path.join(__dirname, 'app/views/layouts/main'), 
    extname: '.hbs',
    helpers: {
        sections:  /* istanbul ignore next */ function(name, options){
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        }
    },
    partialsDir: path.join(__dirname, 'app/views/partials')
}))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'app/views'))

//Middleware for Body Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Static Files
app.use('/static', express.static(path.join(__dirname, '/app/public')));

let victimRoutes = require('./app/routes/victimRoutes');
let hostRoutes = require('./app/routes/hostRoutes');
let emailRoutes = require('./app/controllers/EmailController');
let listingRoutes = require('./app/routes/listingRoutes');
let donorRoutes = require("././app/routes/donorRoutes");
var authRoute = require('./app/routes/auth.js')(app,passport);

app.use(emailRoutes)
app.use(victimRoutes)
app.use(hostRoutes)
app.use(listingRoutes)
app.use(donorRoutes);
//app.use(authRoute);

app.get('/', function (req, res) {
    res.render('index', {
        title: "Helping Hands"
    })
})

app.get('/login', function (req, res) {
    res.render('login', {
        title: "not needed"
    })
})

app.get('/add', (req, res) => {
    res.render('add', {
        title: 'Add a Listing'
    })
})

app.get('/edit', (req, res) => {
    res.render('edit', {
        title: 'Edit Information'
    })
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact'
    })
})

//Models
    var models = require("./app/models");

    //load passport strategies
    require('./app/config/passport/passport.js')(passport,models.user);

db.sequelize.sync().then(function () {
    app.listen(PORT, () => console.log('PORT started on ' + PORT))
})

module.exports = app
