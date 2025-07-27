/* We are referencing the express folder here */
const express = require("express");

/* Create an application of express */
const app = express();

app.get("/user/:userId/:name/:password",(req, res) => {
    const obj = {
        name: "rohit",
        lname: "ramchandani",
    }
    console.log(req.params);
    res.send(obj);
});

/* App is Listening to the server which is on Port 3000 */
app.listen(3000, () => {
    /* Called only when the Server is Up and running */
    console.log("Server is up and running");
});

