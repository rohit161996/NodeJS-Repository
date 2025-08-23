const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup",
    async (req, res) => {
        const userObj = req.body;
        const user = new User(userObj);
        try {
            await user.save();
            res.send("User Added Successfully");
        } catch (err) {
            res.status(400).send("Error saving the user:" + err.message);
        }
    }
);

app.get("/oneuserByEmail",
    async (req, res) => {
        const userEmailId = req.body.emailId;
        if (!userEmailId) {
            return res.status(400).send("emailId is required");
        }

        try {
            const user = await User.findOne({ emailId: userEmailId }).exec();
            if (user.length === 0) {
                res.status(400).send("User not found");
            }
            else {
                res.send(user);
            }
        } catch (err) {
            res.status(400).send("Something went wrong");
        }
    }
);

app.get("/userByEmail",
    async (req, res) => {
        const userEmailId = req.body.emailId;
        if (!userEmailId) {
            return res.status(400).send("emailId is required");
        }

        try {
            const user = await User.find({ emailId: userEmailId }).exec();
            if (user.length === 0) {
                res.status(400).send("User not found");
            }
            else {
                res.send(user);
            }
        } catch (err) {
            res.status(400).send("Something went wrong");
        }
    }
);

app.get("/user",
    async (req, res) => {
        const userEmailId = req.body.emailId;
        if (!userEmailId) {
            return res.status(400).send("emailId is required");
        }

        try {
            const user = await User.find({ emailId: userEmailId }).exec();
            if (user.length === 0) {
                res.status(400).send("User not found");
            }
            else {
                res.send(user);
            }
        } catch (err) {
            res.status(400).send("Something went wrong");
        }
    }
);

app.get("/feed",
    async (req, res) => {
        try {
            const user = await User.find({});
            if (user.length === 0) {
                res.status(400).send("User not found");
            }
            else {
                res.send(user);
            }
        } catch (err) {
            res.status(400).send("Something went wrong");
        }
    }
);

app.delete("/user",
    async (req, res) =>{
        const userId = req.body.userId;
        try{
            const user = await User.findByIdAndDelete({_id : userId});
            res.send("User Deleted Successfully");
        }catch(err){
            res.status(400).send("Something went Wrong");
        }
    }
);

app.patch("/user",
    async (req, res) =>{
        const userId = req.body.userId;
        const data = req.body;
        try{
            const user = await User.findByIdAndUpdate({_id : userId}, data);
            res.send("User Updated Successfully");
        }catch(err){
            res.status(400).send("Something went Wrong");
        }
    }
);

connectDB()
    .then(() => {
        console.log("Database Connected Successfully");
        app.listen(3000, () => {
            console.log("Server is Up and Running");
        })
    })
    .catch(err => {
        console.log("Database cannot be connected");
    })