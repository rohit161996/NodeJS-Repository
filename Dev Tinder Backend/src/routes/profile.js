const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth,
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

profileRouter.patch("/profile/edit", userAuth,
    async (req, res) => {
        try {
            if (!validateEditProfileData(req)) {
                throw new Error("Invalid Edit Request");
            }

            /* 
             * We have already fetched the user from the middleware 
             * Return the user data.
            */
            const loggedInUser = req.user;

            /*
                Bad way of updating the object :-
                loggedInUser.firstName = req.body.firstName;
                loggedInUser.lastName = req.body.lastName;

                Good way :-
            */
            Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);

            /* Save it in database */
            await loggedInUser.save();

            // res.send("User Profile was updated successfully");

            res.json({
                message: `${loggedInUser.firstName}, your profile updated successfully`,
                data: loggedInUser,
            });

        } catch (err) {
            res.status(400).send("ERROR: " + err.message);
        }
    }
);

module.exports = profileRouter;

