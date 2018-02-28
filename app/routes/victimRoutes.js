const express = require('express')
const router = express.Router()
let db = require('../models')
let Victims = db.victims
let keys = require('../config/keys')
const VictimsController = require('../controllers/VictimController').VictimsController
const VictimController = new VictimsController()


router.get('/victims', async (req, res) => {
    let victims = await VictimController.findAll()
    res.json(victims)
})

router.post('/victims/add', async (req, res) => {
    const payload = req.body
    //TODO add validation
    await VictimController.create(payload)
    res.redirect('/victims')
})

router.put('/victims/update/:id', async (req, res) => {
    //receiving user input
    let id = req.params.id
    let payload = req.body

    await VictimController.update(payload, id)
    res.redirect('/victims')
})

router.delete('/victims/delete/:id', async (req, res) => {
    let id = req.params.id
    VictimController.destroy(id)
    // TODO change to front end
    res.redirect('/victims')
})


module.exports = router