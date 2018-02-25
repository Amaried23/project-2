let db = require('../models')
let Hosts = db.hosts

class HostsController {
    async findAll(params) {
        if (!params) params = {}
        let hostData = await Hosts.findAll(params)
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

    async findAndCount() {
        return await Hosts.findAndCount().then(async function(data) {
            return await data
        }).catch(function (error) {
            res.status(500).send('Internal Server Error');
        });
    }
}


module.exports = {HostsController}