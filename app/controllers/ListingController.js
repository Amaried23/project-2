const HostsController = require('../controllers/hostController').HostsController
const HostController = new HostsController()
const sequelize = require('sequelize')
let db = require('../models')
let Hosts = db.hosts

class ListingController {
    async index() {
        return await HostController.findAll()
    }

    async paginate(page, params) {
        let data = await HostController.findAndCount()
        let limit = params.limit
        let pages = Math.ceil(data.count / limit)
        params.offset = limit * (page - 1)

        let hosts = await HostController.findAll(params)

        return [hosts, pages]
    }

    async locate() {
        var lat = parseFloat("-37.1196");
        var lng = parseFloat("42.6733");
        var attributes = Object.keys(Hosts.attributes);
        var location = sequelize.literal(`ST_GeomFromText('POINT(${lat} ${lng})')`);
        var distance = sequelize.fn('ST_Distance_Sphere', sequelize.col('location'), location);
        attributes.push([distance,'distance']);

        let located = await Hosts.findAll({
        attributes: attributes,
        order: distance,
        where: sequelize.where(distance, {$lte: 5000}),
        logging: console.log
        }).catch((err) => {
            console.log(err)
        })

        return located
    }
}

module.exports = {ListingController}