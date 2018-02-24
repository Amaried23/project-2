const express = require('express')
const router = express.Router()
let db = require('../models')
let Hosts = db.hosts

router.get('/hosts', (req, res) => {
    Hosts.findAll({})
    .then(function (obj) {
        res.json(obj)
    })
})

router.post('/hosts/add', (req, res) => {
    const payload = req.body
    //TODO add validation
    Hosts.create(payload)
    res.redirect('/hosts')
})

router.put('/hosts/update/:id', (req, res) => {
    //receiving user input
    let id = req.params.id
    let payload = req.body

    Hosts.update(payload, {
        where: {
            id //id: id is implied with ES6 js
        }
    })
    res.redirect('/hosts')
})

router.delete('/hosts/delete/:id', (req, res) => {
    let id = req.params.id
    Hosts.destroy({
        where: {
            id
        }
    })
    // TODO change to front end
    res.redirect('/hosts')
})


module.exports = router