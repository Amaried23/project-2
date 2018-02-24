const express = require('express')
const router = express.Router()
let db = require('../models')
let Victims = db.victims

router.get('/victims', (req, res) => {
    Victims.findAll({})
    .then(function (obj) {
        res.json(obj)
    })
})

router.post('/victims/add', (req, res) => {
    const payload = req.body
    //TODO add validation
    Victims.create(payload)
    res.redirect('/victims')
})

router.put('/victims/update/:id', (req, res) => {
    //receiving user input
    let id = req.params.id
    let payload = req.body

    Victims.update(payload, {
        where: {
            id
        }
    })
    res.redirect('/victims')
})

router.delete('/victims/delete/:id', (req, res) => {
    let id = req.params.id
    Victims.destroy({
        where: {
            id
        }
    })

    res.redirect('/victims')
})


module.exports = router