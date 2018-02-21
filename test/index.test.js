const assert = require('chai').assert
const index = require('../index')

describe('Index', function () {
    it('should return hello', function () {
        assert.equal(index(), 'hello')
    })
})