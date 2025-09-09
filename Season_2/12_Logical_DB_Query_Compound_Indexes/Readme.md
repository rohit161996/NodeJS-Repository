# Logical DB Query and Compound Indexes
- In this episode the connection API's will be created i.e. how the connection between the users are made will be possible with the help of the APIs.

## Why we do not keep track of the connection requests in the user collection?
- Because, it will be very messy to keep the track of the connection requests in the user collection or User Schema.
- Connection request may or may not get accepted, it can be in the hanging state etc.

## Connection Schema :
- The connection request is a schema in itself. 
- It is a line which connects 2 user.
- It is a relation which is a schema also.
- This model will define the connection between the two users.

- What information will be stored in this collection?
  - It will store the identity of the sender of the request and the identity of the receiver of the request.
  - It will also store the status of the connection request.
  - The values of the status of the connection request will be fixed so, it should be of the type enum i.e. 
```js
    status: {
        type: String,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        }        
    }
```
- The message should be present incase the values are not correct.
- The timestamps should be present to keep track of when the request was sent and when the request was accepted.
- All the fields are required so all the three are `require = true`.
- Now, export the Schema and write the API's :-)

## User Schema
- In the user schema, instead of validating the gender of the User we can put the enum there and give the option of male, female or other.

## API to send request from one user to other:
- When we send a request from a user to other, sender's id is in the token and the receiver's id is in the URL's parameter.
- userAuth has the details of the loggedin user.
- `fromUserId` comes from `req` which comes from `userAuth` of the logged in user.
- Now instead of creating 2 API's for request accept and request reject, we will build a single API for accepting and ignoring.

```js
    requestsRouter.post(
        "/request/send/:status/:toUserId", 
        userAuth,
        async (req, res) => {
            try {
                const fromUserId = req.user._id;
                const toUserId = req.params.toUserId;
                const status = req.params.status;

                const connectionRequest = new ConnectionRequestModel({
                    fromUserId,
                    toUserId,
                    status,
                });

                const data = await connectionRequest.save();
                res.json({
                    message: "Connection Request Sent Successfully!",
                    data,
                });

            } catch (err) {
                req.status(400).send("ERROR: " + err.message);
            }
        }
    );
```

- The above written API is of very basic level.
## Corner Cases
## Issue 1 :
- Only "ignored" and "interested" type of request should be allowed in the request send no other type should be allowed.
```js
    /* Corner Case : Check the request status type */
    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
        return res
            .status(400)
            .json({ message: "Invalid status type:" + status });
    }
```

## Issue 2 :
- One user should send only one request to the other user not multiple.
```js
    /* Corner Case : If there is a request already made to the user */
    const existingConnectionRequest = await ConnectionRequestModel.findOne({
        fromUserId, 
        toUserId,
    });
```

## Issue 3 :
- If a user A has sent request to the user B, then B cannot send the request back to A.
```js
    /* Corner Case : If there is a request already made to the user */
    const existingConnectionRequest = await ConnectionRequestModel.findOne({
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
```

## Issue 4 : 
- Connection request cannot be sent to any random user, it should be sent to the user having the data in the database.
```js
    /* Connection request should be sent to the user in the database */
    const toUser = await UserActivation.findById(toUserId);
    if (!toUser) {
        return res.status(400).json({ message: "User not found" });
    }
```

## Issue 5 :
- If the user wants to send the connection request to itself it should not be allowed.
```js
connectionRequestSchema.pre("save", function(){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself");
    }
    next();
});
```
- This validation comes under schema level so it should be called.


## Pre Function :
- This function is called just before the function name passed in it.
- The next() function should be called necessarily.


## Indexing 
- When the user database will grow, there will be huge number of rows in the connection request database.
- The search query will become expensive. So, we will apply indexing on the database.
- This is the reason we will apply the indexing on the most searched values.

```js
    User.find({
        firstName : "Akshay",
    })
```
- Since, we find the user with the help of the emailid, it should be indexed.

### Indexing - 1st Method
- To make the field indexed in the Schema it should be marked 
```js
{
    firstName : {
        unique : true
    }
}

or

{
    firstName : {
        index : true
    }
}
```

### Indexing - 2nd Method
```js
connectionRequestSchema.index({fromUserId: 1});
```

- After applying the indexing as listed as above the queries like this will be very fast.
```js
ConnectionRequest.find({fromUserId: 1});
```

## Compound Indexes
- To apply indexing on multiple fields we will be using the indexing like:
```js
ConnectionRequest.find({fromUserId: "fnjksdnfjksdnjffjksd", toUserId: "dsjfjksdnfjksdnfjk"});
```
- The argument has different meanings, like :
  - 1 is for ascending.
  - -1 is for descending.

- The compound indexes will optimize the queries like:
```js
User.find({ firstName: "Akshay", lastName: "Saini"});
```

- Creating indexes on all the columns is also not a very good idea.
- This is also very expensive.
- For User table the indexing is not necessary as it is not growing to a huge extent but for the connectionRequest table it is growing to a huge extent.

## $or query & $and query
- Find all user who have email id as ramchandani.rohit16@gmail.com
- Find all user who do not have email id as ramchandani.rohit16@gmail.com
