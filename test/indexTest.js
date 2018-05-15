const expect = chai.expect

describe('index.js', function () {
  const unmodifiedTestArr = [1, 2, 3, 4]
  const unmodifiedTestObj = {one: 1, two: 2, three: 3, four: 4}


  describe('each', function () {
    const alert = chai.spy();
    const testArr = [1, 2, 3, 4]
    const testObj = Object.assign({}, unmodifiedTestObj)
    const spy = chai.spy(x => true)

    it('calls alert with each element passed', function () {
      fi.each(testArr, alert)
      expect(alert).to.have.been.called.exactly(testArr.length)
    })

    it('calls alert properly on object values', function () {
      fi.each(testObj, spy)
      const objValues = Object.values(testObj)
      objValues.forEach((val) => { expect(spy).to.have.been.called.with(val) })
    })

    it('returns the original collection', function () {
      const result = fi.each(testObj, spy)
      expect(testObj === result).to.equal(true)
      expect(objectsEqual(testObj, result)).to.equal(true)
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
      expect(objectsEqual(testObj, unmodifiedTestObj)).to.equal(true)
    })
  })

  describe('reduce', function () {
    const testArr = unmodifiedTestArr.slice() // arr is [1, 2, 3, 4]
    const callback = (acc, val, collection) => (acc + (val * 3))
    const reduceSansAcc = fi.reduce(testArr, callback)
    const reduceWithAcc = fi.reduce(testArr, callback, 10)

    it('returns the correct reduced value when passed an accumulator', function () {
      expect(reduceWithAcc).to.equal(40)
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

    it('returns the value if found', function () {
      expect(fi.find(intArr, findCBGenerator(4))).to.equal(4)
      expect(fi.find(strArr, findCBGenerator("waychillgoldeneye"))).to.equal("waychillgoldeneye")
      expect(fi.find(objArr, findCBGenerator(objB))).to.equal(objB)
    })

    it('does not traverse the whole array if the value is found early', function () {
      const spy = chai.spy(findCBGenerator(0))
      fi.find(intArr, spy)
      expect(spy).to.have.been.called.exactly(3)
    })

    it('returns undefined if the value is not present', function () {
      expect(fi.find(intArr, findCBGenerator(7))).to.equal(undefined)
      expect(fi.find(strArr, findCBGenerator("maxwellisbestmax"))).to.equal(undefined)
      expect(fi.find(objArr, findCBGenerator({c: 'c'}))).to.equal(undefined)
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
      expect(arraysEqual(fi.first(testArr, 3), [1, 2, 3])).to.equal(true)
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

    it('returns a copy of the **array** with all falsy values removed. In JavaScript, _false_, _null_, _0_, _""_, _undefined_ and _NaN_ are all falsy.', function () {
      expect(arraysEqual(fi.compact(nonsenseArr), justOkArr)).to.equal(true)
    })

    it('does not modify the original array', function () {
      fi.compact(nonsenseArr)
      expect(arraysEqual(nonsenseArr, [1, 0, 'a', "", "maru", null, "choux", NaN, false, "doge", undefined])).to.equal(true)
    })
  })

  describe('sortBy', function () {
    const unsortedIntArr = [3, 8, 5, 1, 9, 11, 8]
    const unsortedStringArr = ["maru", "choux", "doge", "coconut"]
    const unsortedObjArr = [
      {name: "dennis", age: 29},
      {name: "dee", age: 40},
      {name: "mac", age: 34},
      {name: "charlie", age: 32},
      {name: "frank", age: 72}
    ]
    const controlSortedObjArr = [
      {name: "dennis", age: 29},
      {name: "charlie", age: 32},
      {name: "mac", age: 34},
      {name: "dee", age: 40},
      {name: "frank", age: 72}
    ]

    function sortArrFunction(val) { return val }
    function sortIntsBySin(val)   { return Math.sin(val) }
    function sortObjFunction(obj) { return obj.age }

    it('correctly sorts arrays of integers and arrays of strings', function () {
      expect(arraysEqual(fi.sortBy(unsortedIntArr, sortArrFunction), [1, 3, 5, 8, 8, 9, 11])).to.equal(true)
      expect(arraysEqual(fi.sortBy(unsortedStringArr, sortArrFunction), ["choux", "coconut", "doge", "maru"])).to.equal(true)
    })

    it('does not modify the original arrays', function () {
      fi.sortBy(unsortedIntArr, sortArrFunction)
      fi.sortBy(unsortedStringArr, sortArrFunction)
      expect(arraysEqual(unsortedIntArr, [3, 8, 5, 1, 9, 11, 8])).to.equal(true)
      expect(arraysEqual(unsortedStringArr, ["maru", "choux", "doge", "coconut"])).to.equal(true)
    })

    it('correctly sorts arrays of integers with non-standard sort', function () {
      expect(arraysEqual(fi.sortBy([1, 2, 3, 4, 5, 6], sortIntsBySin), [5, 4, 6, 3, 1, 2])).to.equal(true)
    })

  })

  describe('flatten', function () {

    it('correctly flattens a ludicrously nested array', function () {
      const nestedArr = [1, [2, 3], [[4, 5], 6, [7, [8, 9]]]]
      const flatArr = fi.flatten(nestedArr)
      expect(arraysEqual(flatArr, [1, 2, 3, 4, 5, 6, 7, 8, 9])).to.equal(true)
    })

    it('correctly flattens a single level when a second argument of "true" is passed', function () {
      const nestedArr = [1, [2, 3], [[4, 5], 6, [7, [8, 9]]]]
      const flatArr = fi.flatten(nestedArr, true)
      expect(arraysEqual(flatArr, [1, 2, 3, [4, 5], 6, [7, [8, 9]]])).to.equal(true)
    })

  })

  describe('uniq', function () {
    const objA = {a: 1, b: 2}
    const objB = objA
    const objC = {c: 3, d: 4}

    it('removes duplicate values from an array', function () {
      expect(arraysEqual(fi.uniq([1, 1, 2, 3, 2, 4, 5, 6, 1]), [1, 2, 3, 4, 5, 6])).to.equal(true)
      expect(arraysEqual(fi.uniq([objA, objC, objB]), [objA, objC])).to.equal(true)
    })

    it('removes duplicate values from an array when an iteratee is applied', function () {
      const newArr = fi.uniq([1, 2, 2, 3, 4, 6, 9], false, (val => val % 3))
      console.log(newArr)
      expect(arraysEqual(newArr, [1, 2, 3])).to.equal(true)
    })

  })

  describe('keys', function () {
    const testObj = Object.assign({}, unmodifiedTestObj)

    it("retrieves all the names of the object's own enumerable properties", function () {
      expect(arraysEqual(fi.keys(testObj), Object.keys(unmodifiedTestObj))).to.equal(true)
    })

    it("does not modify the original object you crazy DOGE!", function () {
      expect(objectsEqual(testObj, unmodifiedTestObj)).to.equal(true)
    })

  })

  describe('values', function () {
    const testObj = Object.assign({}, unmodifiedTestObj)

    it("retrieves all the values of the object's own properties", function () {
      expect(arraysEqual(fi.values(testObj), Object.values(unmodifiedTestObj))).to.equal(true)
    })

    it("does not modify the original object you crazy DOGE!", function () {
      expect(objectsEqual(testObj, unmodifiedTestObj)).to.equal(true)
    })
  })

  describe('functions', function () {
    const testObject = {
      a: "",
      z: () => null,
      p: "",
      c: () => null,
      k: () => null,
    }

    const final = ["c", "k", "z"]


    it('returns a sorted collection of the names of every method in an object', function () {
      expect(arraysEqual(fi.functions(testObject), final)).to.equal(true)
    })
  })

  describe('giveMeMore', function () {
    it('come get more things to do from an instructor', function () {
      expect(false).to.equal(true)
    })
  })

})
