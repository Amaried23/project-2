let db = require('../models')
let Victims = db.victims

class VictimsController {
    async findAll() {
        let victimData = await Victims.findAll({})
        .then(async function (obj) {
            return await obj
        })

        return victimData
    }

    async create(payload) {
        await Victims.create(payload)
    }

    async update(payload, id) {
        await Victims.update(payload, {
            where: {
                id //id: id is implied with ES6 js
            }
        })
    }

    async destroy(id) {
        await Victims.destroy({
            where: {
                id
            }
        })
    }
}


module.exports = {VictimsController}