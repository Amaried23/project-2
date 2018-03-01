var express = require("express");
var stripe = require("stripe")("sk_test_Hx6fBSx86fOfb8SubguAYfxK");

var router = express.Router();

//creating an customer and posting it to the stripe account
router.post("/charge", (req, res) => {
	var amount = 1000;
	console.log(req.body);
	var userEmail = req.body.stripeEmail;
	console.log(userEmail);

	stripe.customers.create({
		email: req.body.stripeEmail,
		source: req.body.stripeToken
	})
	//only shows the customer's id and their token number
	.then(customer => stripe.charges.create({
		amount,
		description: "Donations",
		currency: "usd",
		customer: customer.id
	}))
	// shows up "success" handlebars page after the customer account is successfully made
	.then(charge => res.render("success"));
})

module.exports = router;