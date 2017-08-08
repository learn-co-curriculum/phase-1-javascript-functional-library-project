fi = (function() {
  return {
    each: function(list, iteratee, context=null) {
      if (Array.isArray(list)) {
        for (let i in list) {
          if (context === null) {
            iteratee(list[i],i,list)
          } else {
            iteratee.call(this,[list[i],i,list])
          }
        }
      } else {
        for (let property in list) {
          if (list.hasOwnProperty(property)) {
            if (context === null) {
              iteratee(list[property],property,list)
            } else {
              iteratee.call(this,[list[property],property,list])
            }
          }
        }
      }
      return list
    }
  }
})()

// fi.each(list, iteratee, [context])
// fi.each called with an Array without a context
let numbers = [1,2,3]
fi.each( numbers, n => console.log(n*n) )

// fi.each called with an Array and a context
let multiplerValueObj = {multipler:33}
fi.each( numbers, n => {console.log(this)}, multiplerValueObj)
