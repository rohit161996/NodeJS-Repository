const fs = require("fs");
const https = require("https");

var a = 1078698;
var b = 20986;

console.log("Hello World");

/* Read File -> Synchronous Code */
// fs.readFileSync("./gossip.txt", "utf8");

/* API Code -> Asynchronous Code */
try {
    https.get("https://dummyjson.com/products/1",
        (res) => {
            console.log("Fetched Data Successfully");
        }
    );
}
catch (err) {
    console.log(err);
}

/* setTimeout Code -> Asynchronous Code */
setTimeout(() => {
    console.log("setTimeout after 5 seconds");
}, 5000);



/* Reading from the file -> Asynchronous Code */
try {
    fs.readFile("./gossip.txt", "utf8",
        (err, data) => {
            if (err) {
                console.log("readFile error", err);
                return;
            }
            console.log("File Data", data);
        }
    );
}
catch (err) {
    console.log(err);
}

/* Simple Arithmetic Operation -> Synchronous Code */
function multiplyFn(a, b) {
    const result = a * b;
    return result;
}

var c = multiplyFn(a, b);
console.log("Multiplication result is : ", c);