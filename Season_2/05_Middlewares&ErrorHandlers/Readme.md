# Middleware and Error Handlers
- If we do not send the object from the API call handling, then the postman will go in the infinite loop
  res.send()

```js
app.use("/user",(req, res) => {
    // res.send("Route Handler 1");
});
```

- The above will be in the infinite loop.
- Because the request is not handling

```js
app.use("/user",(req, res) => {
    // res.send("Route Handler 1");
    console.log("Handling the route user!")
});
```

- The above will be printed only once, but it will go in the infinite loop.
- One route can have multiple route handler.

```js
app.use(
    "/user",
    (req, res, next) => {
        // res.send("Handling the 1st route user");
        console.log("Response 1!!");
        next();
    },
    (req, res) => {
        res.send("Handling the 2nd route user");
        console.log("2nd Response!!");
    }
);
```
- The above code handle multiple routes:-
- **Console Output**
  - Response 1!!
  - 2nd Response!!
- **Postman Prints**
  - Handling the 2nd route user

```js
app.use(
    "/user",
    (req, res, next) => {
        res.send("Handling the 1st route user");
        console.log("Response 1!!");
        next();
    },
    (req, res) => {
        res.send("Handling the 2nd route user");
        console.log("2nd Response!!");
    }
);
```

## ERROR:-
- We have already sent the response to the client.
- Now we cannot change the request.
- TCP Connection is made between the client(POSTMAN) and the server(EXPRESS).
- When the server has sent the data and the client has received the data the connection is closed.
- Now the server is sending the data but the client will not be able to receive the data.
- So, don't do the above thing in the code.

```js
app.use(
    "/user",
    (req, res, next) => {
        console.log("Response 1!!");
        next();
        res.send("Handling the 1st route user");
    },
    (req, res) => {
        res.send("Handling the 2nd route user");
        console.log("2nd Response!!");
    }
);
```
- The above code will throw an error.

### 1. Postman Ouptut:
  - Handling the 2nd route user

### 2. VSCode Output:
  - Server is up and running
  - Response 1!!
  - 2nd Response!!
  - ERROR because the 1st middleware is trying to send the header to the client again.


```js
app.use(
    "/user",
    (req, res, next) => {
        console.log("1st Response!!");
        next();
    },
    (req, res) => {
        console.log("2nd Response!!");
        res.send("Handling the 2nd route user");
    },
    (req, res) => {
        console.log("3rd Response!!");
        res.send("Handling the 3rd route user");
    },
    (req, res) => {
        console.log("4th Response!!");
        res.send("Handling the 4th route user");
    }
);
```
- In the above code there will be no error, but the middleware after the 2nd will not execute, since the 2nd middleware handler has already returned the response.

### 1. Postman Ouptut:
  - Handling the 2nd route user

### 2. VSCode Output:
  - 1st Response!!
  - 2nd Response!!


```js
app.use(
    "/user",
    (req, res, next) => {
        console.log("Response!!");
        next();
    },
    (req, res, next) => {
        console.log("2nd Response!!");
        next();
    },
    (req, res, next) => {
        console.log("3rd Response!!");
        next();
    },
    (req, res, next) => {
        console.log("4th Response!!");
        // res.send("Handling the 4th route user");
        next();
    }
);
```
- The above code will not cause the error but it will not be able to process the request, it will go in the infinite loop.
- The express server wants that you can make as many requests as you want to but last response should be returned.

```js
app.use(
    "/user",
    [
    (req, res, next) => {
        console.log("Response!!");
        next();
    },
    (req, res, next) => {
        console.log("2nd Response!!");
        next();
    },
    (req, res, next) => {
        console.log("3rd Response!!");
        next();
    },
    (req, res, next) => {
        console.log("4th Response!!");
        // res.send("Handling the 4th route user");
        next();
    }]
);
```
- We can also send the array of functions(middlewares) in route handler.
- The output will be the same as the code before this.

```js
app.use(
    "/user",
    (req, res, next) => {
        console.log("Response!!");
        next();
    },
    [(req, res, next) => {
        console.log("2nd Response!!");
        next();
    },
    (req, res, next) => {
        console.log("3rd Response!!");
        next();
    }],
    (req, res, next) => {
        console.log("4th Response!!");
        // res.send("Handling the 4th route user");
        next();
    }
);
```
- We can add any routes in the array of middlewares as we want.
- The above route handler can be visualized as the below code.

```js
app.use("/user", rh2, [rh2,rh3],rh4);
```

## Output question:-
```js
app.use(
    "/user", (req, res, next) => {
        console.log("Response!!");
        next();
    }
);

app.use(
    "/user", (req, res, next) => {
        console.log("Response 2!!");
        res.send("2nd Route Handler");
    }
);
```
- This code works fine.

## Output question:-
```js
app.use(
    "/user", (req, res, next) => {
        console.log("Response 2!!");
        res.send("2nd Route Handler");
    }
);

app.use(
    "/user", (req, res, next) => {
        console.log("Response!!");
        next();
    }
);
```
- The above code will run but the second request will not be called.

## Why do we need all these call back functions called Route Handlers?
- These functions are called as middlewares.
- When a get request comes to express, the express server finds the matching URL and it goes through the chain of the middlewares and then it handles the request.

- GET /users => It checks all the app.xxx("matching route") functions
- GET /users => goes to the middleware chain => request handler sends the data back.

## Middleware
- The callback functions are called as the Middlewares.

```js
app.use(
    "/user", (req, res, next) => {
        console.log("Response 2!!");
        res.send("2nd Route Handler");
    }
);
```

## Response Handlers
- The functions which send the response are called response handlers.
- When a get request comes to express, the express server finds the matching URL and it goes through the chain of the middlewares and then it handles the request.

## HTTP Status Codes :-
- There are following HTTP codes:
  - Default : If we are not returning anything in the status the default code is 200.
  - Unauthorized Access : For the unauthorized access the status is 401.
  - Page not Found : For the page not found the status is 404.

## HTTP REST Requests:-
- The GET requests which are handled by the app.get().
- The POST requests[forms, href] are handled by the app.post().
- The function which handles both the requests are app.use() and app.all().

## Difference between use() and all():-
### 1. app.use()
- **Purpose:** Mounts middleware functions.
- **Matches:** All HTTP methods (GET, POST, PUT, etc.) and all routes starting with the given path.
- **Default path:** / (matches everything).
- **Designed for:** Logic that should run for many routes (logging, authentication, parsing, etc.).

- Does not care about exact path, it matches prefixes.

- Example:
```js
    app.use("/api", (req, res, next) => {
        console.log("Middleware for all /api routes");
        next();
    });
```
- Matches /api, /api/users, /api/products, etc.
- Runs for all HTTP methods (GET, POST, …).
- Doesn’t send a response unless you write one.

### 2. app.all()
- **Purpose**: Handles all HTTP methods for a specific route.
- **Exact path match**: The path must match exactly (or with parameters).
- **Designed for**: Defining a handler that applies to all methods on one route (like GET, POST, PUT for /user).

- **Example:**
```js
    app.all("/user", (req, res) => {
        res.send("This runs for GET, POST, PUT, DELETE on /user");
    });
```
- Only matches /user (not /user/123 unless defined with params).
- Immediately sends a response unless you call next().


## Uses of Middlewares
- To avoid writing the code for the authentication again and again we use middlewares.
- For e.g. the request is made from the client for /admin/getAllData, /admin/deleteUser, so the authentication is required for both the request URLs, both the URLs should have the token authentication.

```js
app.use(
    "/admin/getAllData",
    (req, res) => {
        /* Logic of checking the code if the request is authorized or not */
        const token = "xyz";
        const isAdminAuthorized = token === "xyz";
        if(isAdminAuthorized){
            res.send("All the Data is Sent");
        }
        else{
            res.status(401).send("Unauthorized request");
        }
    },
);

app.use(
    "/admin/deleteUser",
    (req, res) => {
        /* Logic of checking the code if the request is authorized or not */
        const token = "xyz";
        const isAdminAuthorized = token === "xyz";
        if(isAdminAuthorized){
            res.send("Deleted a user");
        }
        else{
            res.status(401).send("Unauthorized request");
        }
    },
);

```
- In the above code the authentication code is written over and again.
- It will be passed through the middleware.
```js
/* Handling the Authentication Middleware for all the GET, POST, ... requests */
app.use("/admin", (req, res, next) => {
    const token = "xyz";
    const isAdminAuthorization = token === "xyz";
    if (!isAdminAuthorized) {
        res.status(401).send("Unauthorized request");
    }
    else {
        next();
    }
});

app.use("/admin/getAllData", (req, res) => {
    res.send("All the Data is Sent");
});

app.use("/admin/deleteUser", (req, res) => {
    res.send("Deleted a user");
});

```
- This is a clean way of handling all the routes.
- We can also use the third party middleware.

## Where to all the middlewares?
- In the middlewares/auth.js write the middlewares.
- We can pass the middleware in the routehandlers as well.


```js
IN "app.js"

app.use("/user", userAuth, (req, res) => {
    res.send("User Data is Sent");
});
```

```js
IN "middlewares/auth.js"

const userAuth = (req, res, next) => {
    const token = "xyz";
    const isAdminAuthorized = token === "xyz1";
    if (!isAdminAuthorized) {
        res.status(401).send("Unauthorized request");
    }
    else {
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth
}
```

## Uses :-
- Now we do not require the authentication seperately.
- We can handle the authentication using the middlewares itself.

## Error Handling:-
- Write the logic using the try catch block.
- Otherwise handle the error gracefully.
- 1st parameter will always be the error when 4 parameters are in the function definition.

```js
app.get("/getUserData", (req, res) => {
    try {
        /* Logic of DB call and get user data */
        throw new Error("YO YO Honey Singh");
        res.send("User Data is Sent");
    }
    catch (err) {
        res.status(500).send("Something went wrong contact support");
    }
});

app.use(
    "/",
    (err, req, res, next) => {
        if (err) {
            res.status(500).send("Something went wrong");
        }
    }
);
```

- If the try catch is present the try catch will handle the errors.
- If the try catch is not present the middleware in the route handler for the error written will handle the errors.
- This handling should always be done at the last of the application.
- It is called the wild card error handling.
