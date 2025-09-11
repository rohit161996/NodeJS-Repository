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
                message: req.user.firstName + " is " + status + " in " + toUser.firstName,
                data,
            });

        } catch (err) {
            res.status(400).send("ERROR: " + err.message);
        }
    }
);

requestsRouter.post(
    "/request/review/:status/:requestId",
    userAuth,
    async (req, res) => {
        try {
            const loggedInUser = req.user;
            const { status, requestId } = req.params;

            /* Check that the request received is allowed or rejected, all 
            the other types of request should not be allowed */
            const allowedStatus = ["accepted", "rejected"];
            if (!allowedStatus.includes(status)) {
                return res.status(400).json({ message: "Status not allowed" });
            }

            /* Check that the User Id which we have to change is the same that 
            we have to use to change the status in the Database */
            const connectionRequest = await ConnectionRequest.findOne({
                _id: requestId,
                toUserId: loggedInUser._id,
                status: "interested"
            });

            /* Return message if the validation is not successful */
            if (!connectionRequest) {
                return res
                    .status(404)
                    .json({ message: "Connection request not found" });
            }

            /* Now when the validation is successful we can change the status of the request to accepted */
            connectionRequest.status = status;

            /* Save the changes in the Database */
            const data = await connectionRequest.save();

            res.json({ message: "Connection request " + status, data });
        }
        catch (err) {
            res.status(400).send("ERROR : " + err.message);
        }
    }
);

module.exports = requestsRouter;
