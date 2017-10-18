function arraysEqual(arrA, arrB) {
  if (arrA.length !== arrB.length) return false
  for (let idx = 0; idx < arrA.length; idx++) {
    if (arrA[idx] !== arrB[idx]) {
      if (isNaN(arrA[idx]) && isNaN(arrB[idx])) continue
      return false
    }
  }
  return true
}

function objectsEqual(objA, objB) {
  return (JSON.stringify(objA) === JSON.stringify(objB))
}

// Wanted to avoid using a library so we don't have to deal with breaking updates...
// MODIFIED FROM SO user 'fncomp': https://stackoverflow.com/questions/1003855/howto-benchmark-javascript-code
/**
 * Figure out how long it takes for a method to execute.
 *
 * @param {Function} method to test
 * @param {number} iterations number of executions.
 * @param {Array} args to pass in.
 * @param {T} context the context to call the method in.
 * @return {number} the time it took, in milliseconds to execute.
 */
var bench = function(method, iterations, args, context) {
    var time = 0;
    var timer = function (action) {
        var d = Date.now();
        if (time < 1 || action === 'start') {
            time = d;
            return 0;
        } else if (action === 'stop') {
            var t = d - time;
            time = 0;
            return t;
        } else {
            return d - time;
        }
    };

    var result = [];
    var i = 0;
    timer('start');
    while (i < iterations) {
        result.push(method.apply(context, args));
        i++;
    }

    var execTime = timer('stop');

    if ( typeof console === "object") {
        console.log("Mean execution time was: ", execTime / iterations);
        console.log("Sum execution time was: ", execTime);
        console.log("Result of the method call was:", result[0]);
    }

    return execTime / iterations;
};
