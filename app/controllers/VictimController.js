const express = require('express')
const router = express.Router()
let db = require('../models')

router.get('/victims', (req, res) => {
    db.victims.findAll({})
    .then(function (obj) {
        res.json(obj)
    })
})

    module.exports = router