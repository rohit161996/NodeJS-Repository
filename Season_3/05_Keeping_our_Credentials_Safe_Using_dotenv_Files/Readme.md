# Securing our Application
- Now we will be securing our application.

## Problem 1: Database Connection Exposed
- In the `/config/database.js` file we have the database string present over there.
- Anyone with the database string can access our database.
- We will not be putting the string for the database connection on the github.

## Problem 2: JWT Secret Key Exposed
- In the `middleware/auth.js` file we have the JWT secret key Exposed which we should not expose. 
- We will not be putting the string to decrypt the JWT token on the github.

## Problem 3: Port Number
- In the app.js we have exposed the port number.
- We will not be exposing the port number to the github.

## Solution to the problems
- We will require the dotenv package.
```cmd
npm install dotenv
```

- We will create a `.env` file which will have the credentials.
- It can also contain the port numbers for the connection.
- It will also have the database connection string and the JWT secret key.

- The dotenv package will take all the variables from the .env file and attach the objects to a bigger object i.e. process.env.
- We can use it anywhere in the code base with the help of `process.env.variable_name`.
- We will have to import the package in the root of our application.
- The root of the application is the file `app.js`
- The require statement will be present in the `app.js` file.

- In the constants.js we can load the URL using the if else condition.

# NOTE:
- Load the .env file before the database.
```js
    require("dotenv").config();
    const { connectDB } = require("./config/database");
```

- We will have to create the .env file on the Virtual Machine manually.
- To Deploy the website again:
  - Change the IP Address on the Cloudflare.
  - Change the IP Address on the MongoDB.
  - Change the IP Address in the configuration file in the nginx using the command -> sudo nano /etc/nginx/sites-available/default
  - Copy the Front End Code -> sudo scp -r dist/* /var/www/html/
  - Run the Backend Using the command -> start npm --name devtinder-backend -- start
  - Restart the backend process -> pm2 restart process_no
  - Backend logs -> pm2 log
- This .env file can be used to keep the production environment and the testing environment different.


