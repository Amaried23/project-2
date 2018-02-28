const express = require('express')
const router = express.Router()
const faker = require('faker')
const listingController = require('../controllers/ListingController').ListingController
const ListingController = new listingController()

router.get('/listings', (req, res) => {
    console.log('redirect')
    res.redirect('/listings/1?limit=5')
})

router.get('/listings/:page', async (req, res) => {
    // let unfilteredHosts = await ListingController.index()
    let page = req.params.page
    let limit = 5;

    
    
    if (req.query) {
        console.log(req.query)
        if (req.query.limit) {
            limit = JSON.parse(req.query.limit)
        }
        
        if (req.query.zip) {
            let zip = JSON.parse(req.query.zip)
            //get lat/lng from zip code
            let located = await ListingController.byLocation(51.5177, -0.0968, limit)
            console.log(located)
        }
    }

    let results = await ListingController.paginate(page, {
        limit: limit,
        offset: 0,
        $sort: { 
            id: 1 
        }
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