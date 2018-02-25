const HostsController = require('../controllers/hostController').HostsController
const HostController = new HostsController()

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
}

module.exports = {ListingController}