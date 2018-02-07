// both of these test for equality in values/properties (not references)

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

// MODIFIED FROM SO user 'fncomp': https://stackoverflow.com/questions/1003855/howto-benchmark-javascript-code
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
