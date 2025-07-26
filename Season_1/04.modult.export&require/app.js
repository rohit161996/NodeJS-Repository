require('./xyz.js');

// const obj = require('./sum.js');

var name = "Namaste";

var a = 10;
var b = 20;

// console.log(obj.x);
// obj.calculateSum(a, b);


const { calculateMultiply, calculateSum } = require('./calculate/index.js');
calculateMultiply(10, 20);
calculateSum(15, 25);