const expect = chai.expect
var sinon = require('sinon');

describe('index.js', function () {

  describe('each', function () {
    const alert = sinon.spy();
    const testArr = [1, 2, 3, 4]
    const testObj = {one: 1, two: 2, three: 3, four: 4}

    function assertAlerts(collection, func) {
      for (let i = 0; i < collection.length; i++)
        expect(func).to.have.been.called.with(i)
    }

    it('calls alert with each element passed', function () {
      fi.each(testArr, alert)
      assertAlerts(testArr, alert)
    })

    it('calls alert properly on the values only and returns the original collection', function () {
      const result = fi.each(testObj, alert)
      expect(alert).to.have.been.called.exactly(4);
      for (let i = 0; i < result.length; i++)
        expect(alert).to.have.been.called.with(i);
    })
  })

  describe('map', function () {
    it('makes the function work', function () {

    })
  })

  describe('reduce', function () {
    it('makes the function work', function () {

    })
  })

  describe('find', function () {
    it('makes the function work', function () {

    })
  })

  describe('filter', function () {
    it('makes the function work', function () {

    })
  })

  describe('size', function () {
    it('makes the function work', function () {

    })
  })

  describe('first', function () {
    it('makes the function work', function () {

    })
  })

  describe('last', function () {
    it('makes the function work', function () {

    })
  })

  describe('compact', function () {
    it('makes the function work', function () {

    })
  })

  describe('sortBy', function () {
    it('makes the function work', function () {

    })
  })

  describe('flatten', function () {
    it('makes the function work', function () {

    })
  })

  describe('uniq', function () {
    it('makes the function work', function () {

    })
  })

  describe('keys', function () {
    it('makes the function work', function () {

    })
  })

  describe('values', function () {
    it('makes the function work', function () {

    })
  })

  describe('functions', function () {
    it('makes the function work', function () {

    })
  })

  describe('giveMeMore', function () {
    it('makes the function work', function () {

    })
  })

})
