const expect = chai.expect
var sinon = require('sinon');

describe('index.js', function () {
  const unmodifiedTestArr = [1, 2, 3, 4]
  const unmodifiedTestObj = {one: 1, two: 2, three: 3, four: 4}


  describe('each', function () {
    const alert = sinon.spy();
    const testArr = [1, 2, 3, 4]
    const testObj = Object.assign({}, unmodifiedTestObj)

    it('calls alert with each element passed', function () {
      fi.each(testArr, alert)
      expect(func).to.have.been.called.exactly(testArr.length)
    })

    it('calls alert properly on object values and returns the original collection', function () {
      const result = fi.each(testObj, alert)
      assertAlerts(testObj, alert)
      const objMutated = JSON.stringify(testObj) !== JSON.stringify(result)
      expect(objMutated).to.equal(false)
    })
  })

  describe('map', function () {
    const testArr = unmodifiedTestArr.slice()
    const testObj = Object.assign({}, unmodifiedTestObj)
    const callback = (x) => (x * 3)

    const arrResult = fi.map(testArr, callback)

    it('successfully returns a correctly populated array', function () {
      expect(arraysEqual([3, 6, 9, 12], arrResult)).to.equal(true);
    })

    it('does not modify the original array', function () {
      expect(arraysEqual(testArr, unmodifiedTestArr)).to.equal(true);
    })

    const objResult = fi.map(testObj, callback)

    it('successfully returns a correctly populated array from modified object values', function () {
      expect(arraysEqual([3, 6, 9, 12], objResult)).to.equal(true);
    })

    it('does not modify the original object', function () {
      const objMutated = JSON.stringify(testObj) !== JSON.stringify(unmodifiedTestObj)
      expect(objMutated).to.equal(false)
    })
  })

  describe('reduce', function () {
    const testArr = unmodifiedTestArr.slice()
    const callback = (x) => (x * 3)

    const reduceSansAcc = fi.reduce(testArr, callback)
    const reduceWithAcc = fi.reduce(testArr, callback, 10)

    it('returns the correct reduced value when not passed an accumulator', function () {
      expect(reduceSansAcc).to.equal(10)
    })

    it('returns the correct reduced value when passed an accumulator', function () {
      expect(reduceWithAcc).to.equal(20)
    })

    it('does not modify the original array', function () {
      expect(arraysEqual(unmodifiedTestArr, testArr)).to.equal(true)
    })

  })

  describe('find', function() {
    function findCBGenerator(target) {
      return (function(currEl) { return target === currEl })
    }

    const intArr = [-1, 4, 0, 1, 3, 2, 3, 4, 5, 6]
    const strArr = ["maru", "choux", "doge", "coco", "waychillgoldeneye", "trance"]
    const objB = {b: 'b'}
    const objArr = [{a: 'a'}, objB]

    it('returns true if the value is found', function () {
      // no reason to think students implementation won't work with reference/value checking but you never know how they are going to structure things
      expect(fi.find(intArr, findCBGenerator(4))).to.equal(true)
      expect(fi.find(strArr, findCBGenerator("waychillgoldeneye"))).to.equal(true)
      expect(fi.find(objArr, findCBGenerator(objB))).to.equal(true)
    })

    it('does not traverse the whole array if the value is found early', function () {
      const watchedCB = findCBGenerator(0)
      sinon.spy(watchedCB)
      fi.find(intArr, watchedCB)
      expect(watchedCB).to.have.been.called.exactly(3)
    })

    it('returns false if the value is not present', function () {
      expect(fi.find(intArr, findCBGen(7))).to.equal(false)
      expect(fi.find(strArr, findCBGen("maxwellisbestmax"))).to.equal(false)
      expect(fi.find(objArr, findCBGen({c: 'c'}))).to.equal(false)
    })

  })

  describe('filter', function () {
    const testArr = [6, 11, 5, 12, 17, 100, 9, 1, -8]

    function excluder(currEl) {
      return (currEl > 10)
    }

    it('correctly filters for values that the callback evaluates as true', function () {
      const greaterThan10 = fi.filter(testArr, excluder)
      expect(arraysEqual(greaterThan10, [11, 12, 17, 100])).to.equal(true)
    })
  })

  describe('size', function () {
    const testArr = unmodifiedTestArr.slice()
    const testObj = Object.assign({}, unmodifiedTestObj)

    it('correctly returns the size of the collection when an array is passed', function () {
      expect(fi.size(testArr)).to.equal(testArr.length)
    })

    it('correctly returns the size of the collection (amount of keys) when an object is passed', function () {
      expect(fi.size(testObj)).to.equal(Object.keys(testObj).length)
    })
  })

  describe('first', function () {
    const testArr = unmodifiedTestArr.slice()

    it('returns the first element of the collection', function () {
      expect(fi.first(testArr)).to.equal(1)
    })

    it('returns the first n elements of the collection when the second optional argument (n) is provided', function () {
      expect(arraysEqual(fi.first(testArr, 3), [1, 2, 3]).to.equal(true)
    })
  })

  describe('last', function () {
    const testArr = unmodifiedTestArr.slice()

    it('returns the last element of the collection', function () {
      expect(fi.last(testArr)).to.equal(4)
    })

    it('returns the last n elements of the collection when the second optional argument (n) is provided', function () {
      expect(arraysEqual(fi.last(testArr, 3), [2, 3, 4])).to.equal(true)
    })
  })

  describe('compact', function () {
    const nonsenseArr = [1, 0, 'a', "", "maru", null, "choux", NaN, false, "doge", undefined]
    const justOkArr = [1, 'a', "maru", "choux", "doge"]

    it('Returns a copy of the **array** with all falsy values removed. In JavaScript, _false_, _null_, _0_, _""_, _undefined_ and _NaN_ are all falsy.', function () {
      expect(arraysEqual(fi.compact(nonsenseArr), justOkArr)).to.equal(true)
    })

    it('Does not modify the original array', function () {
      fi.compact(nonsenseArr)
      expect(arraysEqual(nonsenseArr, [1, 0, 'a', "", "maru", null, "choux", NaN, false, "doge", undefined])).to.equal(true)
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
