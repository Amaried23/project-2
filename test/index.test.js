const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const index = require('../index')

describe('/GET Index', function (done) {
    it('should respond with a 200 status', function () {
        chai.request(index)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200)
            done()
            })
    })
})