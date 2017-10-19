function arraysEqual(arrA, arrB) {
  if (arrA.length !== arrB.length) return false
  for (let idx = 0; idx < arrA.length; idx++) {
    if (arrA[idx] !== arrB[idx]) {
      if (isNaN(arrA) && isNaN(arrB)) continue
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

function bench(method, iterations, args, context) {
    var start = 0;
    function timer(action) {
        var currTime = Date.now();
        if (action === 'start') {
            start = currTime;
            return 0;
        } else if (action === 'stop') {
            var elapsed = currTime - start;
            start = 0;
            return elapsed;
        }
    };

    timer('start')
    for (let i = 0; i < iterations; i++)
        method.apply(context, args)
    var totalTime = timer('stop')
    // console.log("Mean execution time was: ", totalTime / parseFloat(iterations));
    // console.log("Sum execution time was: ", totalTime);
    return totalTime / parseFloat(iterations);
};
