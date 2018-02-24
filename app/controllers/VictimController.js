const express = require('express')
const router = express.Router()
let db = require('../models')

router.get('/victims', (req, res) => {
    db.victims.findAll({})
    .then(function (obj) {
        res.json(obj)
    })
})

router.post('/victims/add', (req, res) => {
    const payload = req.body
    db.victims.create(payload)
    res.redirect('/victims')
})


    module.exports = router