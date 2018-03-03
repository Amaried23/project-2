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
    let guestCount = 10;
    let located = false;

    
    
    if (req.query) {
        console.log(req.query)
        if (req.query.limit) {
            limit = JSON.parse(req.query.limit)
        }

        if (req.query.guest_count) {
            guestCount = JSON.parse(req.query.guest_count)
        }
        
        if (req.query.lat && req.query.lng) {
            let lat = JSON.parse(req.query.lat)
            let lng = JSON.parse(req.query.lng)
            //get lat/lng from zip code
            located = await ListingController.byLocation(parseFloat(lat),parseFloat(lng), limit, Number(guestCount))
            console.log(located)
        }
    }

    if (!located) {
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
    } else {
        console.log('fired')
        res.render('listings', {
            title: "Listings",
            hosts: located[0]
        })
    }

})

module.exports = router