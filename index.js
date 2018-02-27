var express = require("express");
var stripe = require("stripe")("sk_test_Hx6fBSx86fOfb8SubguAYfxK");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var path = require("path");

var app = express();

//Handlebars Middleware

app.engine("handlebars", exphbs({
    defaultLayout: path.join(__dirname, "app/views/layouts/main")}
    ));
app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, 'app/views'))


//body parser middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//set static folder
app.use('/static', express.static(path.join(__dirname, '/app/public')));

//routes
var donorRoutes = require("./app/routes/donorRoutes");
app.use(donorRoutes);

var PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`))