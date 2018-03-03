const chai = require('chai')
let should = chai.should()
let expect = chai.expect
let db = require('../app/models')
db.hosts.modelName = 'Hosts'
db.victims.modelName = 'Victims'
let models = [db.hosts, db.victims]
const faker = require('faker')

var i = 0;

do {

models.forEach(model => {
    describe(`${model.modelName} Model`, function () {
        let firstName = faker.fake("{{name.firstName}}")
        let lastName = faker.fake("{{name.lastName}}")
        let lat = faker.fake("{{address.latitude}}")
        let lng = faker.fake("{{address.longitude}}")
        let email = faker.fake("{{internet.email}}")
        let address = faker.fake("{{address.streetAddress}}")
        let phone = faker.phone.phoneNumberFormat().replace(/-/g, '')
        let startDate = faker.date.between('2018-03-01', '2018-04-31')
        let endDate = faker.date.between('2018-04-01', '2019-04-31')
        let guestCount = faker.random.number({min:1, max:10})
        var modelData = {
            guest_count: guestCount,
            start_date: startDate,
            end_date: endDate,
            location: {
                type: "Point",
                coordinates: [
                    lat,
                    lng
                ]
            },
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            address: address,
            email: email,
        }
    
        it(`should create a new ${model.modelName}`, function (done) {
    
            model.create(modelData).then(function (user) {
                //victim name should be equivalent to the fake submission we are using
                expect(user.first_name).to.equal(firstName); 
                //remove the entry from the database
                // model.destroy({
                //     where: {
                //         id: user.id
                //     }
                // })
            }).then(function() {
                done()
            }) 
        });
    
        it(`should delete a ${model.modelName} from the database`, function () {
            model.create(modelData).then(function (user) {
                //victim name should be equivalent to the fake submission we are using
                //remove the entry from the database
                model.destroy({
                    where: {
                        id: user.id
                    }
                })
                
                try {
                    model.findOne({
                        where: {
                            id: user.id
                        }
                    })
                } catch (err) {
                    expect(user.first_name).to.undefined; 
                    if (err) {
                        done()
                    }
                }
    
            })
        })
    
        it(`should update the ${model.modelName} entry in the database`, async function () {
            const user = await model.create(modelData).then(function (user) {
                //after user is created, then update a value
                modelData.guest_count = 12
                return model.update(modelData, {
                    where: {
                        id: user.id
                    }
                }).then(function(data) {
                    return model.findOne({
                        where: {
                            id: user.id
                        }
                    })
                })
            })
            expect(user.guest_count).to.be.equal(12);
            model.destroy({
                where: {
                    id: user.id
                }
            })
        })
    })    
});
i++
} while(i < 50000)