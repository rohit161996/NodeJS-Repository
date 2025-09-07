const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const User = require("../models/user");

authRouter.post("/signup",
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

authRouter.post("/login",
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

authRouter.post("/logout",
    async (req, res) => {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
        });
        res.send("User has logged out successfully");
    }
);

module.exports = authRouter;
