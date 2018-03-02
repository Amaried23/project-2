var authController = require('../controllers/authcontroller.js');

module.exports = function(app,passport){

	console.log(app);
	console.log(passport);

app.get('/signup', authController.signup);


app.get('/signin', authController.signin);


app.post('/signup', passport.authenticate('local-signup',  { successRedirect: '/edit',
                                                    failureRedirect: '/'}
                                                    ));


app.get('/dashboard',isLoggedIn, authController.dashboard);


//app.get('/logout',authController.logout);


app.post('/signin', passport.authenticate('local-signin',  { successRedirect: '/edit',
                                                    failureRedirect: '/s'}
                                                    ));


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}


}
