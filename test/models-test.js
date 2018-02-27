const chai = require('chai')
let should = chai.should()
let expect = chai.expect
let db = require('../app/models')
db.hosts.modelName = 'Hosts'
db.victims.modelName = 'Victims'
let models = [db.hosts, db.victims]

models.forEach(model => {
    describe(`${model.modelName} Model`, function () {
        var modelData = {
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
            last_name: "Destroyed",
            phone: "7325556677",
            address: "123 main street, red bank, nj",
            email: "spkellydev@gmail.com",
        }
    
        it(`should create a new ${model.modelName}`, function (done) {
    
            model.create(modelData).then(function (user) {
                //victim name should be equivalent to the fake submission we are using
                expect(user.first_name).to.equal("Sean"); 
                //remove the entry from the database
                model.destroy({
                    where: {
                        id: user.id
                    }
                }).then(function() {
                    done()
                }) 
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
        })
    })    
});