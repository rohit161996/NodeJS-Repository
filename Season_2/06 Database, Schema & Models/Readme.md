# Connecting the Project to the Database:
## 1. Create a cluster
- Create a Cluster in the MongoDB, just like the way it was done in the Season 1 - Episode 13.
- The cluster was created on the MongoDB website and the connection was made with the help of the MongoDB compass.

## 2. Create a Database
- The database will be created in the same cluster and make the connection to this cluster using the MongoDB Compass.

## 3. Connecting the Project to the MongoDB cluster
- We want our application to connect to the cluster and connect to the database.
- It is done using the connection string, using this URL only we can connect to the Database.
- The URL contains the Cluster name and password.

## How to do the above tasks?
- Create a directory named config/ in the src/ folder.
- All the configuration files are present in this folder.
- The database configuration settings are present in the config/database.js
- Here there will be a logic to connect to the database.
- To connect to the database an important library is used called mongoose.
- Earlier we were using the mongoDB library.
- It is the standard library used to build NodeJS MERN application.

# Mongoose 
- It gives us a boiler plate as well on the URL.
- https://mongoosejs.com/

## 1. Installation of Mongoose in the Application
- npm install mongoose

## 2. Importing the mongoose package
- In the `database.js` file the mongoose package is imported.
```js
const mongoose = require('mongoose');

const url = "mongodb+srv://rohitramchandanistm1996:0PjcLOLxxCQgJcFC@devtinder.5r7n2iz.mongodb.net/";
```

## 3. Connecting to the database
- Then the connection is made to the cluster or the database whichever is mentioned in the url.
```js
const connectDB = async () => {
    await mongoose.connect(url);
}

connectDB()
    .then(() => {
        console.log("Database connection established successfully");
    })
    .catch(err => {
        console.log("Database cannot be connected!!");
    })
```

## 4. Importing the database file in the file with the express server file
```js
/* We are referencing the express folder here */
const express = require("express");

/* Import the file to establish the connection to the cluster */
require("./config/database");

/* Create an application of express */
const app = express();

/* App is Listening to the server which is on Port 3000 */
app.listen(3000, ()=>{
    /* Called only when the Server is Up and running */
    console.log("Server is up and running");
});
```

## Correct workflow:-
- The above flow is not correct.
- The database connection should be done first successfully, only after the successful connection the express server should listen to the client's request.

```js
IN database.js

const mongoose = require('mongoose');

const url = "mongodb+srv://rohitramchandanistm1996:0PjcLOLxxCQgJcFC@devtinder.5r7n2iz.mongodb.net/devTinder";

const connectDB = async () => {
    await mongoose.connect(url);
}

module.exports = {
    connectDB,
}
```


```js
IN app.js

const express = require("express");

const { connectDB } = require("./config/database");

const app = express();

connectDB()
    .then(() => {
        console.log("Database connection established successfully");
        app.listen(3000, () => {
            console.log("Server is up and running");
        });
    })
    .catch(err => {
        console.log("Database cannot be connected!!");
    })
```

## According to the LLD
- There will be a User collection.
- In the Cluster we will have collection of all the user.
- We will create a Schema of the User.
- It is defining what columns will be stored in the User Collection.

## How to create the schema for the User?
- Create a Model Directory.
- In the models/ create a file user.js to create a schema for the user -> user.js
- Create a schema in the user.js for the User table.

```js
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender : {
        type: String
    },
});
```
- These are the feilds that can be stored in the collection in the cluster.
- Now we will create a mongoose model.
```js
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
```

or 

```js
module.exports = mongoose.model("User", userSchema);
```

- The model i.e. the UserModel or any other model's name starts with caps as it stores the data.
- It should be considered as a class.
- Instance of the class will go in the UserModel Collection.

## Creating the first API which interacts with the database:
- To add the data to the database use the POST API.
```js
app.post(
    "/signup",
    (req, res) => {
        const userObj = {
            firstName : "Rohit",
            lastName : "Ramchandani",
            emailId : "ramchandani.rohit16@gmail.com",
            password : "rohit@1234"
        }
    }
);
```
- Now we need to add this object to the User Model by creating the instance of the UserModel.

- Creating a new instance of the model -> UserModel.
```js
const user = new UserActivation(userObj);
```

- Saving the instance to the UserModel to the database, most of these functions returns a promise so we need to make these functions as async await.
```js
await user.save();
```

## API to create the instance of a model -> new user into the database:-
- It saves the dummy data to the database.
```js
app.post(
    "/signup",
    async (req, res) => {
        const userObj = {
            firstName : "Rohit",
            lastName : "Ramchandani",
            emailId : "ramchandani.rohit16@gmail.com",
            password : "rohit@1234"
        }

        const user = new UserActivation(userObj);
        await user.save();
    }
);
```

## Nomenclature
- devTinder is a database.
- users is a collection.
- The data stored in the collection is the document.

## Extra Fields
- The columns such as the _id and the __v are created by the MongoDB.
- __v is used for version, if it is upgraded then it is changed.

## Note :
- Always write the database code in the try-catch block.
- It will in error handling for the API's.
```js
    try {
        await user.save();
        res.send("User Added Successfully");
    }catch(err){
        res.status(400).send("Error saving the user:" + err.message);
    }
```