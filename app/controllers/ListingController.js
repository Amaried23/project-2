const HostsController = require('../controllers/hostController').HostsController
const HostController = new HostsController()

class ListingController {
    async index() {
        return await HostController.findAll()
    }

    async paginate(page) {
        let data = await HostController.findAndCount()
        let limit = 5
        let offset = 0
        let pages = Math.ceil(data.count / limit)
        offset = limit * (page - 1)

        let params = {
            limit: limit,
            offset: offset,
            $sort: { id: 1 }
        }

        return await HostController.findAll(params)
 
    }
}

module.exports = {ListingController}