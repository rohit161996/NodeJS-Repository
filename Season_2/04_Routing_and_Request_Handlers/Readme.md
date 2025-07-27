## Routing and Request Handling

## Why do we push the package-lock.json on the git?
- We push package-lock.json to Git because it locks dependencies to specific versions, ensuring consistency and reliability across all environments (dev, staging, prod, CI/CD).
  1. **Locks exact dependency versions**
     - package.json might say:
       ```js
       "express": "^4.18.0"
       ```
      → This means: install 4.18.0 or any minor/patch above it, e.g., 4.18.2
     
     - But package-lock.json will lock it to the exact version, e.g.:
       ```js
       "express": {
       "version": "4.18.2"
       }
       ✅ This ensures everyone on your team, CI/CD, and production servers installs the same versions, avoiding bugs due to version drift.

  2. **Faster npm install**
     - npm reads from package-lock.json first, skipping version resolution.
     - This makes installations faster and deterministic.

  3. **Security auditing**
     - Tools like npm audit use package-lock.json to scan for vulnerable versions.
     - Without it, the scan might miss nested dependencies.

  4. **Prevents hidden bugs**
     - Let’s say a patch version of a dependency introduces a bug.
     - Without package-lock.json, fresh installs might get the broken version.
     - With it, you always get the known-working version.

## Working of the app.use().
- If the route of the URL matches the /text in the app.use() like
  - http://localhost:3000/test/
  - http://localhost:3000/test/hello/1234
  - It will go to the 
    ```js
    app.use("/test", (req, res)=>{
      res("Hello from the test");
    })
    ```

- But this will not work 
- http://localhost:3000/test1234

- But if 
    ```js
    app.use("/", (req, res)=>{
      res("Hello from the test");
    })
    ```
  this is there then no other route will work since, this will be the only one which works.

- If we write the code afterwards will the "/" affect the code the same way
  ```js
  app.use("/", (req, res)=>{
    res("Hello from the test");
  })
  ```
## YESSSSS, the hello, test etc. will work fine.
## NOTE:
- Order of the routes is very very important.
- If we give anything after "/" which does not match the routes it will map to "/".

## HTTP Methods:-
- GET, POST, PATCH, DELETE are the HTTP Methods.
- http://localhost:3000/xyz is making a get API call to the server.
- Whenever we are hitting the search of any URL we are making a GET API call to the route on the server.
- We need to write a code to make the POST API call.
- To test the POST API calls browser is the WORST way, we need to use the Postman to test the API Calls.

## Postman
- It is a standard open source software which can be used to test the APIs.
- We can also share the APIs using this, since this also acts as a repository.
  http://www.postman.com/downloads/
- Create a workspace in the Postman
- Create collection of APIs if the APIs are very large in the number.

## Why are we using the PostMan?
- It is used to make the POST, PUT, PATCH, DELETE request which we cannot do with the Browser.
```js
app.get("/user",(req, res) => {
    const obj = {
        name: "rohit",
        lname: "ramchandani",
    }
    res.send(obj);
});

app.post("/user",(req, res) => {
    res.send("Data successfully saved to the database!");
});

app.delete("/user",(req, res) => {
    res.send("Deleted Successfully");
});
``` 
- The above handling of the requests are specific to the request made from the GET, POST and DELETE respectively.
- But the use will take all the request if written above all the request with matching URL.
```js
app.use("/user",(req, res) => {
    const obj = {
        name: "rohit",
        lname: "ramchandani",
    }
    res.send(obj);
});
``` 

## How to give the multiple routes to the URL or Optional URL?
- Below URL can be called for both:-
- http://localhost:3000/abc
- http://localhost:3000/ac

```js
app.get("/ab?c",(req, res) => {
    const obj = {
        name: "rohit",
        lname: "ramchandani",
    }
    res.send(obj);
});
```

- Below URL can be called for both:-
- http://localhost:3000/abc
- http://localhost:3000/abbbbbbbbbbbbbbbbbbbbbbc
```js
app.get("/ab+c",(req, res) => {
    const obj = {
        name: "rohit",
        lname: "ramchandani",
    }
    res.send(obj);
});
```

- Below URL can be called for both:-
- http://localhost:3000/abc
- http://localhost:3000/abvdfnvdfjlvnlkdfvklmc
```js
app.get("/ab*c",(req, res) => {
    const obj = {
        name: "rohit",
        lname: "ramchandani",
    }
    res.send(obj);
});
```

- Below URL can be called for both:-
- http://localhost:3000/abcd
- http://localhost:3000/abcbcbcbcbcbcbcbcbcbcbcbcd
```js
app.get("/a(bc)+d",(req, res) => {
    const obj = {
        name: "rohit",
        lname: "ramchandani",
    }
    res.send(obj);
});
```

## Regex :-
- We can also write Regex over Here.
1. Below URL will work for any URL containing a
- http://localhost:3000/fmgkldmlkgmdlflka
```js
app.get(/a/,(req, res) => {
    const obj = {
        name: "rohit",
        lname: "ramchandani",
    }
    res.send(obj);
});
```

2. Below URL will work for URL ending with "fly"
- http://localhost:3000/butterfly
- http://localhost:3000/housefly
```js
app.get(/.*fly$/,(req, res) => {
    const obj = {
        name: "rohit",
        lname: "ramchandani",
    }
    res.send(obj);
});
```

## Getting the Parameters from the URL
- The parameters from the URL are get using the following URL and API call
- http://localhost:3000/user?userId=101
```js
app.get("/user",(req, res) => {
    const obj = {
        name: "rohit",
        lname: "ramchandani",
    }
    console.log(req.query);
    res.send(obj);
});
```

- http://localhost:3000/user?userId=101&password=testing
```js
app.get("/user",(req, res) => {
    const obj = {
        name: "rohit",
        lname: "ramchandani",
    }
    console.log(req.query);

    res.send(obj);
});
```

## How to make the routes dynamic?
- http://localhost:3000/user/707
```js
app.get("/user/:userId",(req, res) => {
    const obj = {
        name: "rohit",
        lname: "ramchandani",
    }
    console.log(req.params);
    res.send(obj);
});
```

### Complex Dynamic Routes
- http://localhost:3000/user/707/xyz/testing
```js
app.get("/user/:userId/:name/:password",(req, res) => {
    const obj = {
        name: "rohit",
        lname: "ramchandani",
    }
    console.log(req.params);
    res.send(obj);
});
```

