const express = require("express");
const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.get("/getUserData", (req, res) => {
    try {
        /* Logic of DB call and get user data */
        throw new Error("YO YO Honey Singh");
        res.send("User Data is Sent");
    }
    catch (err) {
        res.status(500).send("Something went wrong contact support");
    }
});

app.use(
    "/",
    (err, req, res, next) => {
        if (err) {
            res.status(500).send("Something went wrong");
        }
    }
);

app.listen(3000, () => {
    console.log("Server is up and running");
});

