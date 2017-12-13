var fs = require('fs')

const arrLength = 1000
const x = new Uint8Array(arrLength)

for (var idx = 0; idx <= arrLength; idx++) {
    x[idx] = Math.round(Math.random() * 50)
}

const sortedX = x.slice().sort()

var file = fs.createWriteStream("./test/testArrays.js");
file.on('error', function(err) { console.error(err) });

file.write('var unsortedArr = [')
x.forEach(function(n) { file.write(`${n}, `); });
file.write(']\n')

file.write('var sortedArr = [')
sortedX.forEach(function(n) { file.write(`${n}, `); });
file.write(']')


file.end();
