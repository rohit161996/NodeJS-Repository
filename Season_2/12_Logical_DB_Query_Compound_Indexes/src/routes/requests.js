const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestsRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestsRouter.post(
    "/request/send/:status/:toUserId",
    userAuth,
    async (req, res) => {
        try {
            const fromUserId = req.user._id;
            const toUserId = req.params.toUserId;
            const status = req.params.status;

            /* Corner Case : Check the request status type */
            const allowedStatus = ["ignored", "interested"];
            if (!allowedStatus.includes(status)) {
                return res
                    .status(400)
                    .json({ message: "Invalid status type:" + status });
            }

            /* Connection request should be sent to the user in the database */
            const toUser = await User.findById(toUserId);
            if (!toUser) {
                return res.status(400).json({ message: "User not found" });
            }

            /* Corner Case : If there is a request already made to the user */
            const existingConnectionRequest = await ConnectionRequest.findOne({
                $or: [
                    { fromUserId, toUserId },
                    { fromUserId: toUserId, toUserId: fromUserId }
                ],
            });

            if (existingConnectionRequest) {
                return res
                    .status(400)
                    .send({ message: "Connection Request Already Exists" });
            }

            const connectionRequest = new ConnectionRequest({
                fromUserId,
                toUserId,
                status,
            });

            const data = await connectionRequest.save();
            res.json({
                message: req.user.firstName + "is" + status + "in" + toUser.firstName,
                data,
            });

        } catch (err) {
            res.status(400).send("ERROR: " + err.message);
        }
    }
);


module.exports = requestsRouter;
