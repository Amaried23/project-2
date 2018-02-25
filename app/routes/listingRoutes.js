const express = require('express')
const router = express.Router()
const faker = require('faker')
const listingController = require('../controllers/ListingController').ListingController
const ListingController = new listingController()

router.get('/listings/:page', async (req, res) => {
    // let unfilteredHosts = await ListingController.index()
    let page = req.params.page
    let paginatedHosts = await ListingController.paginate(page)
    
    

    res.render('listings', {
        title: "Listings",
        hosts: paginatedHosts
    })
})

module.exports = router