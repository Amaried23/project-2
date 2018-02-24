const chai = require('chai')
let should = chai.should()
let expect = chai.expect
let db = require('../app/models')
let Victim = db.victims

describe('Victims Model', function () {

    it('should create a new victim', function (done) {
        var victimData = {
            guest_count: 3,
            start_date: "2018-01-11T00:00:00.000Z",
            end_date: "2018-01-12T00:00:00.000Z",
            location: {
                type: "Point",
                coordinates: [
                    -74.323564,
                    40.232323
                ]
            },
            first_name: "Sean",
            last_name: "Kelly",
            phone: "7325556677",
            address: "123 main street, red bank, nj",
            email: "spkellydev@gmail.com",
        }

        var newVictim = Victim.create(victimData);


        expect(newVictim.first_name).to.equal("Sean"); 
        done()

      });
})