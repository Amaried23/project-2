const express = require('express')
const router = express.Router()
const faker = require('faker')
const listingController = require('../controllers/ListingController').ListingController
const ListingController = new listingController()

router.get('/listings/:page', async (req, res) => {
    // let unfilteredHosts = await ListingController.index()
    let page = req.params.page

    let results = await ListingController.paginate(page, {
        limit: 5,
        offset: 0,
        $sort: { id: 1 }
    })
    let paginatedHosts = results[0]
    let pages = results[1]
    
    

    res.render('listings', {
        title: "Listings",
        hosts: paginatedHosts,
        pages
    })
})

module.exports = router