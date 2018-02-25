const express = require('express')
const router = express.Router()
let db = require('../models')
let Hosts = db.hosts

class HostsController {
    async findAll() {
        let hostData = await Hosts.findAll({})
        .then(async function (obj) {
            return await obj
        })

        return hostData
    }

    async create(payload) {
        await Hosts.create(payload)
    }

    async update(payload, id) {
        await Hosts.update(payload, {
            where: {
                id //id: id is implied with ES6 js
            }
        })
    }

    async destroy(id) {
        await Hosts.destroy({
            where: {
                id
            }
        })
    }
}


module.exports = {HostsController}