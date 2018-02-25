const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')
const db = require('./app/models')
const PORT = process.env.PORT || 3000
const app = express()
const faker = require('faker')

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
//Static Files
app.use('/static', express.static(path.join(__dirname, '/app/public')));

let victimRoutes = require('./app/routes/victimRoutes');
let hostRoutes = require('./app/routes/hostRoutes');
let emailRoutes = require('./app/controllers/EmailController');
let listingRoutes = require('./app/routes/listingRoutes');

app.use(emailRoutes)
app.use(victimRoutes)
app.use(hostRoutes)
app.use(listingRoutes)

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

app.listen(PORT, () => console.log(`server started on port ${PORT}`))

module.exports = app