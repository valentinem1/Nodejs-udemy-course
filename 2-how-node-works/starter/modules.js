// console.log(arguments); => show all the arguments from the module function (require, module, exports, __dirname, __filename);
// console.log(require('module').wrapper);

// module.exports
const calculator = require('./test-modules-1');

const calc1 = new calculator();
console.log(calc1.add(1, 5));

// exports
const calculator1 = require('./test-modules-2');
console.log(calculator1.add(1, 5));

// Caching
// the first console.log() gets print only once due to caching
// the function invoke right away gets call every time
require('./test-modules-3')();
require('./test-modules-3')();
require('./test-modules-3')();