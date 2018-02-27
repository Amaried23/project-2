const chai = require('chai')
let should = chai.should()
let expect = chai.expect
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
    it('should not have errors', function () {
        chai.request(index)
            .get('/')
            .end((err, req) => {
                expect(err).to.be.null
                done()
            })
    })

    it('should be html', function () {
        chai.request(index)
            .get('/')
            .end((err, req) => {
                req.should.be.html
                done()
            })
    })
})