const crypto = require("crypto");

console.log("Hello World");

var a = 1078698;
var b = 20986;

/* pbkdf2 - Password Base Key Derivative Function */
/* Synchronous Function */
crypto.pbkdf2Sync("password", "salt", 500000, 50, "sha512");
console.log("First Key is Generated");

setTimeout(() => {
    console.log("Call me right now!!");
}, 0); /* It will only be called when the call stack is empty  */

/* Async Function */
crypto.pbkdf2("password", "salt", 500000, 50, "sha512", (err, key) => {
    console.log("Second Key is generated");
});

function multiplyFn(x, y) {
    const result = a * b;
    return result;
}

var c = multiplyFn(a, b);
console.log("Multiplication Result is :", c);

