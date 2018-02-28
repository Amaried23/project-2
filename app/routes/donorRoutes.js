var express = require("express");
var stripe = require("stripe")("sk_test_Hx6fBSx86fOfb8SubguAYfxK");

var router = express.Router();

router.get("/", (req, res) => {
	res.render("index");
})

router.post("/charge", (req, res) => {
	var amount = 1000;
	console.log(req.body);
	var userEmail = req.body.stripeEmail;
	console.log(userEmail);

	//res.send("TEST");

	stripe.customers.create({
		email: req.body.stripeEmail,
		source: req.body.stripeToken
	})
	.then(customer => stripe.charges.create({
		amount,
		description: "Donations",
		currency: "usd",
		customer: customer.id
	}))
	.then(charge => res.render("success"));
})

module.exports = router;