# refs, Populate & Thought Process of writing an API
- Now we will build the API for accepting and rejecting the connection request.

## /request/review API
- First we will figure out all the corner cases and the edge cases as well.

- Validate the status of the request.

- The toUserId's value should be the same value of the person who has loggedin, since it will be the one who will accept or reject the request.

- It is because the person who has received the request should only accept the request.

- The request Id should be present in the database.

```js
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
```

- Now in the Postman fire the URL on the basis of _id in the database.
- http://localhost:3000/request/review/accepted/68c1045a0a6749f3513913e5

## NOTE :
- This API converts the `interested` status to `accepted` or `rejected` with validation and database checking.

## API's for Getting the user Information:
- Now we will write the get API's.
- For the POST API's try to check from the hacker's point of view and make as many checks as possible for the validation before `connectionRequest.save()`.
- The save() to the database should be the second last line of the POST API.
- The new file with the routes should be registered also.

- Now the following API will help in getting the connection requests of a user.
```js
    userRouter.get(
        "/user/requests/received",
        userAuth,
        async (req, res) => {
            try{
                const loggedInUser = req.user;
                const connectionRequest = await ConnectionRequest.find({
                    toUserId: loggedInUser._id
                });

                res.json({
                    message: "Data fetched successfully",
                    data: connectionRequest,
                });
            }

            catch(err){
                res.status(400).json("ERROR : " + err.message);
            }
        }
    );
```

- This will give the response like :
```js
{
    "message": "Data fetched successfully",
    "data": [
        {
            "_id": "68c1287ac635a6481687d648",
            "fromUserId": "68aacf49e518f302b7c8a8d4",
            "toUserId": "68c0fc84153012da96e5f3cf",
            "status": "interested",
            "createdAt": "2025-09-10T07:27:54.726Z",
            "updatedAt": "2025-09-10T07:27:54.726Z",
            "__v": 0
        },
        {
            "_id": "68c128bac635a6481687d652",
            "fromUserId": "68adf42fc39149adbb561c6b",
            "toUserId": "68c0fc84153012da96e5f3cf",
            "status": "interested",
            "createdAt": "2025-09-10T07:28:58.076Z",
            "updatedAt": "2025-09-10T07:28:58.076Z",
            "__v": 0
        }
    ]
}
```

- To identify which request is from which user we have to go back and forth and match the id.
- To avoid this we need to make a relation between `ConnectionRequest` and the `User` schema.
- To make the relation we need to write the ref in the Schema.
```js
    const connectionRequestSchema = new mongoose.Schema(
        {
            fromUserId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", /* This field is a reference to the User Schema */
                require: true
            },
            toUserId: {
                type: mongoose.Schema.Types.ObjectId,
                require: true
            },
            status: {
                type: String,
                enum: {
                    values: ["ignored", "interested", "accepted", "rejected"],
                    message: `{VALUE} is incorrect status type`
                },
            },
        },
        {
            timestamps: true,
        }
    );
```

- Now, if we give the reference to the data in the schema, the other data will also be displayed.
```js
    userRouter.get(
        "/user/requests/received",
        userAuth,
        async (req, res) => {
            try{
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

            catch(err){
                res.status(400).json("ERROR : " + err.message);
            }
        }
    );
```

- If we write `.populate("fromUserId");` then all the data will be given, when the array with the fields is not passed in the populate function.
- We can pass a string as well with the column names seperated with string.
- This is similar to join in the database.

```js
{
    "message": "Data fetched successfully",
    "data": [
        {
            "_id": "68c1287ac635a6481687d648",
            "fromUserId": {
                "_id": "68aacf49e518f302b7c8a8d4",
                "firstName": "harsh",
                "lastName": "Ramchandani"
            },
            "toUserId": "68c0fc84153012da96e5f3cf",
            "status": "interested",
            "createdAt": "2025-09-10T07:27:54.726Z",
            "updatedAt": "2025-09-10T07:27:54.726Z",
            "__v": 0
        },
        {
            "_id": "68c128bac635a6481687d652",
            "fromUserId": {
                "_id": "68adf42fc39149adbb561c6b",
                "firstName": "Mahendra Singh",
                "lastName": "Dhoni"
            },
            "toUserId": "68c0fc84153012da96e5f3cf",
            "status": "interested",
            "createdAt": "2025-09-10T07:28:58.076Z",
            "updatedAt": "2025-09-10T07:28:58.076Z",
            "__v": 0
        }
    ]
}
```

## Ref and Populate:
- With the help of ref and populate, we have make reference in the connectionRequest Schema and the User schema.
- With the help of this we can populate the fields of the User Schema when we are making the query on the connectionRequest Schema.


## /request/connections API :
- This API will get all the requests which have been accepted and rejected.

```js
const USER_SAFE_DATA = "firstName lastName photoURL about age gender skills";

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
                if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
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
```



