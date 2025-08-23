## Task Completed
- As of now we have pushed the raw dummy data to the database.
- Now, we want to push the actual data from the Postman(Client) to the Database.

## GraphQL
- It is done with the help of the GraphQL.
- Data is send in the JSON format

## JSON Format
- Before the JSON format data was sent in the XML format.

## Difference between the JSON object and the JS Object:
- In the JSON Object the key is a string.
- In the JS Object the key is not a string.

## /signup API's
- In the /signup POST APIs the Object is JavaScript Object.

```js
app.post(
    "/signup",
    async (req, res) => {
        console.log(req.body);
    }
);

Output :-
undefined
```
- Server is not able to read the body of the request, since it is in JSON format.
- It is done with the help of the middleware, there is a middleware to convert the JSON data to the readable format i.e. `express.json()`.
- The middleware which works for all the URL:
- If we do not pass anything in the URL, this will work for all the URL.
```js
app.use(()=>{

})
```

- If we pass /test in the URL it will work for the URL which starts with /test URL.
```js
app.use("/test",()=>{

})
```

- To use the middleware, write:
```js
app.use(express.json());
```
- This will be in the middle of all the URLs.

## Updated API to add data to the Database:
```js
app.use(express.json());

app.post(
    "/signup",
    async (req, res) => {
        const userObj = req.body;
        const user = new User(userObj);
        try {
            await user.save();
            res.send("User Added Successfully");
        }catch(err){
            res.status(400).send("Error saving the user:" + err.message);
        }
        console.log(req.body);
    }
);
```

## API to get the data from the Database by emailId:
```js
app.get(
    "/userByEmail",
    async (req, res) => {
        const userEmailId = req.body.emailId;
        if (!userEmailId) {
            return res.status(400).send("emailId is required");
        }

        try {
            const user = await User.find({ emailId: userEmailId }).exec();
            if (user.length === 0) {
                res.status(400).send("User not found");
            }
            else {
                res.send(user);
            }
        } catch (err) {
            res.status(400).send("Something went wrong");
        }
    }
);
```
- exec() should be written in the chaining of the find()


## Read all the user Data from the Database - Feed APIs:
```js
app.get(
    "/feed",
    async (req, res) => {
        try {
            const user = await User.find({});
            if (user.length === 0) {
                res.status(400).send("User not found");
            }
            else {
                res.send(user);
            }
        } catch (err) {
            res.status(400).send("Something went wrong");
        }
    }
)
```

## Difference between the find() and findOne() method:
- find() will return all the results even if they are the same.
- findOne() will return only one of the result even if they are same.

## Practices :
- There should not be two person with same emailid.
- find() is used in the production.
- findOne() is not used in the production.

## API to delete the Data in the Database
```js
app.delete("/user",
    async (req, res) =>{
        const userId = req.body.userId;
        try{
            const user = await User.findByIdAndDelete({_id : userId});
            res.send("User Deleted Successfully");
        }catch(err){
            res.status(400).send("Something went Wrong");
        }
    }
);
```


## API to update the Data in the Database
```js
app.update("/user",
    async (req, res) =>{
        const userId = req.body.userId;
        try{
            const user = await User.findByIdAndUpdate({_id : userId});
            res.send("User Updated Successfully");
        }catch(err){
            res.status(400).send("Something went Wrong");
        }
    }
);
```
- findByIdAndUpdate() is same as the findByOneAndUpdate().

- The data sent from the Postman is :
```js
{
    "userId" : "68a88f24e0e021ed182fd7bd",
    "firstName" : "Rohitttt",
    "lastName" : "Ramchandaniiii"
}
```
- The userId is not present in the model which we have defined so it will not be present in the update as well.

- It does not matter how many values we pass from the client(Postman) to the server it will be stored only when the field is mentioned in the model.

- If can pass the parameter before and after in the :
```js
findByIdAndUpdate(..., returnDocument : "before")
findByIdAndUpdate(..., returnDocument : "after")
```

