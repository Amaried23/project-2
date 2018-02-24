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
                })
            })
    
            //Ending Mocha
            done()
        });
    
        it(`should delete a ${model.modelName} from the database`, function () {
            model.create(modelData).then(function (user) {
                //victim name should be equivalent to the fake submission we are using
                expect(user.first_name).to.equal("Sean"); 
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
                    if (err) {
                        done()
                    }
                }
    
            })
        })
    
        it(`should delete a ${model.modelName} from the database`, function () {
            model.create(modelData).then(function (user) {
                //victim name should be equivalent to the fake submission we are using
                expect(user.first_name).to.equal("Sean"); 
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
                    if (err) {
                        done()
                    }
                }
    
            })
        })
    })    
});
