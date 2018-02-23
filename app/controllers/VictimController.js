let db = require('../models')

class Victim {
    index(req, res) {
        db.Victim.findAll({}).then(function(data){
            console.log(data)
            res.json(victimData)
        })
    }
}

module.exports = Victim