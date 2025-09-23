const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl about age gender skills";

/* Get all the pending connection request */
userRouter.get(
    "/user/requests/received",
    userAuth,
    async (req, res) => {
        try {
            const loggedInUser = req.user;
            const connectionRequest = await ConnectionRequest.find({
                toUserId: loggedInUser._id,
                status: "interested"
            }).populate("fromUserId", ["firstName", "lastName"]);

            res.json({
                message: "Data fetched successfully",
                data: connectionRequest,
            });
        }

        catch (err) {
            res.status(400).json("ERROR : " + err.message);
        }
    }
);

/* Get all the accepted connection request */
userRouter.get(
    "/user/connections",
    userAuth,
    async (req, res) => {
        try {
            const loggedInUser = req.user;
            /*
                Akshay => Elon => accepted
                Elon => Mark => accepted
            */
            const connectionRequests = await ConnectionRequest.find({
                $or: [
                    { toUserId: loggedInUser._id, status: "accepted" },
                    { fromUserId: loggedInUser._id, status: "accepted" },
                ],
            }).populate("fromUserId", USER_SAFE_DATA)
                .populate("toUserId", USER_SAFE_DATA);

            const data = connectionRequests.map((row) => {
                if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                    return row.toUserId;
                }
                return row.fromUserId;
            });

            res.json({ data });

        }
        catch (err) {
            res.status(400).send();
        }
    }
);

/* Get the profiles of other users on the platform */
userRouter.get(
    "/feed",
    userAuth,
    async (req, res) => {
        try {
            const loggedInUser = req.user;

            const page = parseInt(req.query.page) || 1;

            let limit = parseInt(req.query.limit) || 10;
            limit = limit > 50 ? 50 : limit;

            const skip = (page - 1) * limit;

            /* Find all the connection request which are (sent or received) 
               by the logged in user */
            const connectionRequest = await ConnectionRequest.find({
                $or: [
                    { fromUserId: loggedInUser._id },
                    { toUserId: loggedInUser._id }
                ],
            }).select("fromUserId toUserId");

            /* Now we have got the users from whom we got the request and the 
               user to whom we have sent the request, so we will now take unique users with the help of set and we will hide these from the user feed. */
            const hideUsersFromFeed = new Set();
            connectionRequest.forEach(req => {
                hideUsersFromFeed.add(req.fromUserId.toString());
                hideUsersFromFeed.add(req.toUserId.toString());
            });

            /* Now we will find all the users from the database whose id are not
               present( Not IN -> nin ) in the hideUsersFromFeed */
            const users = await User.find({
                $and: [
                    { _id: { $nin: Array.from(hideUsersFromFeed) }, },
                    { _id: { $ne: loggedInUser._id }, },
                ]
            }).select(USER_SAFE_DATA).skip(skip).limit(limit);

            res.send(users);
        } catch (err) {
            res.status(400).send("Error:" + err.message);
        }
    }
);

module.exports = userRouter;