const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestsRouter = express.Router();

requestsRouter.post("/sendConnectionRequest", userAuth,
    async (req, res) => {
        try {
            const user = req.user;
            res.send(user.firstName + " Sent the connect request");
        } catch (err) {
            req.status(400).send("ERROR: " + err.message);
        }
    }
);


module.exports = requestsRouter;
