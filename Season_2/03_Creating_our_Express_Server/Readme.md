# Creating our Express Server
## Create a Project
```cmd
  npm init
```
- It makes the file package.json

## Install the dependencies
```cmd
  npm install

    or

  npm i
```
- The above commands will help to install the dependencies of the project which are mentioned in the `package.json`.

## Project Creation
  - Create the src/ directory
- Create app.js file in it.
- It is the main Javascript file to write the Javascript Code

## Create a Server
- Listen on the server, listen()
- To the incoming requests on the listen()

- We will use the ExpressJS to create the server.

- Following are the steps to install express.
- https://www.npmjs.com/package/express

- npm install express
- It created the file node_modules/ directory which has all the source code foe expressJS
- express dependency is added in the package.json

- Dependency is the package on which the function is dependent on.
- Rest all the folders which are there in the node_modules are the dependencies of the express.
- node_modules is a very heavy package it has too much dependencies.
- It created the package-lock.json which has the exact version of the package on which we are working on.

## Carrot ^
- Package can get upgraded.
- express : "4.19.2"
  - 4 - Major version
  - 19 - Minor version 
  - 2 - patch
- It started from 1.0.0 -> 1.1.0 ....
- Project starts from 1.0.0
- 1.0.1 -> Minor Change with patch(small change, bugfix)
- 1.1.0 -> Minor version change
- 2.1.0 -> Major Changes, it will only be done if the changes will break the existing library.
- Minor versions are backward compatible.
- 1.0.1 -> 1.x.x are compatible

- If we are upgrading the Application, careful to update the major changes.
- ^4.19.2
- Project will automatically get updated with new version having minor changes

## Tilda ~
- Project will not get updated it will be the same.

- Project uses the latest version

## Creating our own server:-
```js
/* We are referencing the express folder here */
const express = require("express");

/* Create an application of express */
const app = express();

/* App is Listening to the server which is on Port 3000 */
app.listen(3000, ()=>{
    /* Called only when the Server is Up and running */
    console.log("Server is up and running");
});
```

## How to check the server is running or not?
- node .\src\app.js
- http://localhost:3000/

## How to run the server continously?
- To run the server continously install the package nodemon.
  - npm install -g nodemon

- To install with the admin rights
  - sudo npm install -g nodemon

- To run the file having the server code
  - nodemon src/app.js

## To avoid writing the command nodemon src/app.js
- In the package.json add the following :-
```js
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon ./src/app.js"
  },
```

- Now, we need to use the command.
  - npm run start

## We can add the URL from the server in the use function:-
```js
/* Getting the response from the server on the / URL*/
app.get("/",(req, res) => {
    res.send("Namaste Rohit Ramchandani!!");
})
```
## NOTE:-
- app.use() -> For middleware or catching all methods
- app.get() -> For handling only the GET request
- app.post() -> For handling only the POST request

## GET Flow:-
### We get the data from the server in the GET Method.
```text
[ BROWSER ]
   |
   |  User types `http://localhost:3000/hello`
   v
[ SEND GET REQUEST ]
   |
   |  Method: GET
   |  Path: /hello
   v
[ EXPRESS SERVER ]
   |
   |-- `app.use()` [middleware, if any]
   |
   |-- `app.get("/hello", handler)`  ✅ MATCH FOUND
   |        |
   |        |-- Executes the callback:
   |        |   `res.send("Hello Rohit Ramchandani!!")`
   |
   v
[ RESPONSE SENT TO BROWSER ]
   |
   |-- Browser receives:
   |   "Hello Rohit Ramchandani!!"
   v
[ BROWSER DISPLAYS THE TEXT ]
```

## POST Flow:-
### We post the data to the server using the POST Method.
```text
[ BROWSER or CLIENT (e.g., Postman, HTML form) ]
   |
   |-- User submits form or sends JSON to:
   |      `http://localhost:3000/login`
   |
   |-- Sends POST request
   |      Method: POST
   |      Path: /login
   |      Body: { "username": "rohit", "password": "1234" }
   v
[ EXPRESS SERVER ]
   |
   |-- `app.use(express.json())`         ✅ Parses JSON body (middleware)
   |
   |-- `app.post("/login", handler)`     ✅ Route MATCH FOUND
   |        |
   |        |-- Extracts data from req.body:
   |        |     const { username, password } = req.body;
   |        |
   |        |-- Processes login logic (e.g., check credentials)
   |        |
   |        |-- Sends response:
   |              res.send("Login Successful")
   |
   v
[ RESPONSE SENT TO BROWSER ]
   |
   |-- Browser/Postman receives:
   |   "Login Successful"
   v
[ CLIENT DISPLAYS THE RESPONSE ]
```

## Why is the -g used in the command to install?
- To install the package globally on the system.
- Makes the package accessible from any directory via the command line.
- npm install -g <package-name>
