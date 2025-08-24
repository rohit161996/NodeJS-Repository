const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup",
    async (req, res) => {
        try {
            /* Validating the data */
            validateSignUpData(req);

            const { firstName, lastName, emailId, password } = req.body;

            /* Encrypting the Password */
            const passwordHash = await bcrypt.hash(password, 10);
            console.log(passwordHash);

            const user = new User({
                firstName,
                lastName,
                emailId,
                password: passwordHash,
            });

            await user.save();
            res.send("User Added Successfully");
        } catch (err) {
            res.status(400).send("ERROR:" + err.message);
        }
    }
);

app.post("/login",
    async (req, res) => {
        try {
            const { emailId, password } = req.body;

            /* 1. Check the email Id is valid or not? */
            const user = await User.findOne({ emailId: emailId });
            if (!user) {
                throw new Error("User with the Email id is not present in the Database");
            }

            /* 2. Check that the password is valid or not  */
            const isValidPassword = await user.validatePasswords(password);
            if (!isValidPassword) {
                throw new Error("Password is not valid");
            }
            else {

                /* Password is valid */
                /* 1. Create a JWT Token */
                const token = await user.getJWT();

                /* 2. Add the token to cookie and send it back to the client */
                res.cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 8 * 3600000) });
                res.send("User Login Successfully");
            }

        } catch (err) {
            res.status(400).send("ERROR: " + err.message);
        }
    }
);

app.get("/profile", userAuth,
    async (req, res) => {
        try {
            /* Get the user object from the userAuth middleware */
            const user = req.user;

            /* Send back the user object as response */
            res.send(user);

        } catch (err) {
            res.status(400).send("ERROR: " + err.message);
        }
    }
);

app.post("/sendConnectionRequest", userAuth,
    async (req, res) => {
        try {
            const user = req.user;
            res.send(user.firstName + " Sent the connect request");
        } catch (err) {
            req.status(400).send("ERROR: " + err.message);
        }
    }
)

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
    async (req, res) => {
        const userId = req.body.userId;
        try {
            const user = await User.findByIdAndDelete({ _id: userId });
            res.send("User Deleted Successfully");
        } catch (err) {
            res.status(400).send("Something went Wrong");
        }
    }
);

app.patch("/user/:userId",
    async (req, res) => {
        const userId = req.params?.userId;
        const data = req.body;

        /* API Level Validation */
        const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

        /* Loop the data through the keys in the ALLOWED_UPDATES */
        /* isAllowedUpdates is false if any of the key is not present in this */
        const isAllowedUpdates = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        );

        /* We will return of the isAllowedUpdates is false */
        if (!isAllowedUpdates) {
            throw new Error("Update not allowed");
        }

        try {
            const user = await User.findByIdAndUpdate({ _id: userId }, data, {
                returnDocument: "after",
                runValidators: true,
            });
            res.send("User Updated Successfully");
        }
        catch (err) {
            res.status(400).send("User Updated Failed" + err.message);
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