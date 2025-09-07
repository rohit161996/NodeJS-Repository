# We will be building more API's in this Episode
## List of API's
- POST /signup
- POST /login
- POST /logout
  
- GET /profile/view
- PATCH /profile/edit -> Edit the details except for the emailId and password
- PATCH /profile/password -> This will be the seperate API for the password updation

- POST /request/send/ignored/:userId
- POST /request/send/interested/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

- GET /connections -> To get the matches or the connections we have /connections API.
- GET /requests/received -> To get the requests received from the connections.
- GET /feed -> To get a batch of profiles at once.


### Status: 
1. Ignore (Pass)
- POST /request/send/ignored/:userId
- The Ignore API has a User Id Attached to it, with reference to the Tinder.

2. Interested (Like)
- POST /request/send/interested/:userId
- The Interested API has a User Id Attached to it, with reference to the Tinder.

3. Accepted
- POST /request/review/accepted/:requestId
- The Accepted API has a request Id Attached to it, with reference to the Tinder.

4. Rejected
- POST /request/review/rejected/:requestId
- The Rejected API has a request Id Attached to it, with reference to the Tinder.

## CoreAPI Call:-
- This API will load 30-35 users at once, it does not load the API's one by one.
- This is the feed API, it gets us the Multiple User's for the Match when we login to the platform.
- The data also has the field called _id, which makes us remember the MongoDB.
- This gives us hint that Tinder is using the MongoDB for Database or other NoSQL Database.

## Best Practices
- We will not write all the API's in the single file, it is a poor way of writing the API's.
- We will be using the express routers maintaining the routers in a proper way.
- We will group the routers on the basis of the functionality like the following API's are authentication API's so we will be using the authRouter APIs.

- authRouter
  - POST /signup
  - POST /login
  - POST /logout

- profileRouter
  - GET /profile/view
  - PATCH /profile/edit
  - PATCH /profile/password

- connectionRequestRouter
  - POST /request/send/ignored/:userId
  - POST /request/send/interested/:userId
  - POST /request/review/accepted/:requestId
  - POST /request/review/rejected/:requestId

- userConnectionsRouters
  - GET /user/connections
  - GET /user/requests/received
  - GET /user/feed

- Best Practices of the Project is to group these API's into a router.
- Just by using the name of the API's we should get the functionality of the API's.

## Grouping the API's
- Now we will be grouping the API's.
- We will create a directory /routes in this we will create the auth.js, profile.js and requests.js in this file we will write the APIs.
- Just replace the 
```js
app.get('/');

with

router.get('/');
```
- Both of these are the same.
- Now in the app.js import all the API's because the app.js will receive the requests for the APIs.
```js
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestsRouter = require("./routes/requests");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestsRouter);
```
- This is the way to map the route to the URL in the authRouter, profileRouter and requestsRouter.
- Earlier whenever the first request used to match that router will respond to the request. 

## Logout API's
```js
authRouter.post("/logout",
    async (req, res) => {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
        });
        res.send("User has logged out successfully");
    }
);

module.exports = authRouter;
```
- In the /logout API we don't have to do anything, we will only have to expire the cookie.
- It cookie data gets removed from the postman.
- We do not have to do the userAuth using the middleware because any user can logout if it has loggedin or not.
- For large scale application the /logout API can be very different.
- It has the cleaning activities.

## Profile API's - /profile/view
```js
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
```

## Validate Edit Profile Data
- We do not want user to edit some fields like emailId, because it is a primary key, it should be unique for all the user.
- Login credentials should not be updated except for the password.
```js
const validateEditProfileData = (req) => {
    const allowedEditFields = [
        "firstName",
        "lastName",
        "emailId",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills"
    ];

    /* 
     * Object.keys loop through all the feilds of the req.body &
     * checks for every field that it is included in the allowedEditFields or not??
     */
    const isEditAllowed = Object.keys(req.body).every((field) =>
        allowedEditFields.includes(field)
    );

    return isEditAllowed ? true : false;
}
```
- Export this function now.

## /profile/edit
```js
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

            res.send("User Profile was updated successfully");
        } catch (err) {
            res.status(400).send("ERROR: " + err.message);
        }
    }
);
```

## /profile/password API
- Forgot password API.
