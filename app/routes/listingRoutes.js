const express = require('express')
const router = express.Router()
const faker = require('faker')
const listingController = require('../controllers/ListingController').ListingController
const ListingController = new listingController()

router.get('/listings', async (req, res) => {
    // let unfilteredHosts = await ListingController.index()
    let page = 1 //req.params.page
    let paginatedHosts = await ListingController.paginate(page)
    
    

    res.render('listings', {
        title: "Listings",
        hosts: paginatedHosts
    })
})

module.exports = router