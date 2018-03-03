const express = require('express')
const router = express.Router()
let db = require('../models')
let Hosts = db.hosts
const HostsController = require('../controllers/hostController').HostsController
const HostController = new HostsController()


router.get('/hosts', async (req, res) => {
    let hosts = await HostController.findAll()
    res.json(hosts)
})

router.post('/hosts/add', async (req, res) => {
    const payload = req.body
    //TODO add validation
    await HostController.create(payload)
    res.redirect('/hosts')
})

router.put('/hosts/update/:id', async (req, res) => {
    //receiving user input
    let id = req.params.id
    let payload = req.body

    await HostController.update(payload, id)
    res.redirect('/hosts')
})

router.delete('/hosts/delete/:id', async (req, res) => {
    let id = req.params.id
    HostController.destroy(id)
    // TODO change to front end
    res.redirect('/hosts')
})


module.exports = router