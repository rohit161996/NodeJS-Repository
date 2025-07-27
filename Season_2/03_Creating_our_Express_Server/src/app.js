/* We are referencing the express folder here */
const express = require("express");

/* Create an application of express */
const app = express();

/* Getting the response from the server on the http://localhost:3000/ URL*/
app.get("/",(req, res) => {
    res.send("Namaste Rohit Ramchandani!!");
})

/* Getting the response on the http://localhost:3000/hello */
app.get("/hello",(req, res) => {
    res.send("Hello Rohit Ramchandani!!");
})

/* Getting the response on the http://localhost:3000/test */
app.get("/test",(req, res) => {
    res.send("Hello This is the Test Page!!");
})

/* App is Listening to the server which is on Port 3000 */
app.listen(3000, () => {
    /* Called only when the Server is Up and running */
    console.log("Server is up and running");
});
 