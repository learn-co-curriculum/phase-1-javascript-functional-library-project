fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, iteratee) {
      let newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection)

      for (let idx = 0; idx < newCollection.length; idx++)
        iteratee(newCollection[idx])

      return collection
    },

    map: function(collection, iteratee) {
      if (!(collection instanceof Array))
        collection = Object.values(collection)

      const newArr = []

      for (let idx = 0; idx < collection.length; idx++)
        newArr.push(iteratee(collection[idx]))

      return newArr
    },

    reduce: function(collection, iteratee, acc) {
      if (!(collection instanceof Array))
        collection = Object.values(collection)

      for (let idx = 0; idx < collection.length; idx++)
        acc = iteratee(acc, collection[idx], collection)

      return acc
    },

    find: function(collection, predicate) {
      if (!(collection instanceof Array))
        collection = Object.values(collection)

      for (let idx = 0; idx < collection.length; idx++)
        if (predicate(collection[idx])) return true

      return false
    },

    filter: function(collection, predicate) {
      if (!(collection instanceof Array))
        collection = Object.values(collection)

      const newArr = []

      for (let idx = 0; idx < collection.length; idx++)
        if (predicate(collection[idx])) newArr.push(collection[idx])

      return newArr
    },

    size: function(collection) {
      return (collection instanceof Array) ? collection.length : Object.keys(collection).length
    },

    first: function(collection, stop=false) {
      return (stop) ? collection.slice(0, stop) : collection[0]
    },

    last: function(collection, start=false) {
      return (start) ? collection.slice(collection.length-start, collection.length) : collection[collection.length-1]
    },

    compact: function(collection) {
      const badBad = new Set([false, null, 0, "", undefined, NaN])
      return collection.filter(el => !badBad.has(el))
    },

    // works like insertion sort
    iSortLast: function(arr) {
      let currIdx = arr.length-1
      while(currIdx > 0 && arr[currIdx-1] > arr[currIdx]) {
        const temp = arr[currIdx-1]
        arr[currIdx-1] = arr[currIdx]
        arr[currIdx] = temp
        currIdx--
      }
    },

    sortBy: function(collection, callback) {
      const newArr = []
      for (let val of collection) {
        newArr.push(callback(val))
        this.iSortLast(newArr)
      }
      console.log("returning: ", newArr)
      return newArr
    },

    functions: function() {

    },

  }
})()

fi.libraryMethod()
