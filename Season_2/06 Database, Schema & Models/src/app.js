const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");

app.post(
    "/signup",
    async (req, res) => {
        const userObj = {
            firstName: "Rohit",
            lastName: "Ramchandani",
            emailId: "ramchandani.rohit16@gmail.com",
            password: "rohit@1234"
        }

        const user = new User(userObj);
        try {
            await user.save();
            res.send("User Added Successfully");
        }catch(err){
            res.status(400).send("Error saving the user:" + err.message);
        }
    }
);

connectDB()
    .then(() => {
        console.log("Database connection established successfully");
        app.listen(3000, () => {
            console.log("Server is up and running");
        });
    })
    .catch(err => {
        console.log("Database cannot be connected!!");
    })
