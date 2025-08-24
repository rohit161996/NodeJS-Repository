const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        /* Read the token from the request */
        const cookies = req.cookies;

        /* Get the token from the cookies */
        const { token } = cookies;
        if (!token) {
            throw new Error("Token is not Valid!!!!!");
        }

        /* Verify the Token */
        const decodedMessage = await jwt.verify(token, "Dev@Tinder$790");
        console.log(decodedMessage);

        /* Get the _id of the User from the Decoded Message */
        const { _id } = decodedMessage;

        /* Get the User with the id */
        const user = await User.findById({ _id: _id });
        if (!user) {
            throw new Error("User Not Found");
        }

        req.user = user;
        /* To move to the request handler */
        next();
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
}

module.exports = {
    userAuth
}
