# sync, async and setTimeoutZero : Code
- The synchronous code is executed quickly by the javascript.

- The asynchronous code will block the main thread, if the v8 engine will run the it, so the v8 engine offloads the asynchronous code to the libuv.

- In the async.js code file, synchronous code will execute very quickly then the API read executes then the setTimeout executes.

- v8 engine offloads the asynchronous task to the `libuv` and the synchronous task to the `call stack`.

- We have the synchronous functions for the file reading as well, but it will block the IO, it will halt the system, `fs.readFileSync();`.

- Most of the synchronous functions will have the Sync word at the end of the function.

- The Synchronous functions halt the execution of the program, i.e. they block the main thread.

- In the `blocking.js` function the password key derivative function halts the execution of the program since it is synchronous.

- Synchronous function block the main thread so they should not be used.

- Synchronous function is suffocation the v8 engine.

## Trust Issues with setTimeout
- The setTimeout function is the asynchronous function, it will be executed by the libuv library, even if the time which is passed in the parameter is 0ms, so it will execute later after the synchronous functions.

- There are terms and conditions applied to the setTimeout, the setTimeout() will execute only after certain seconds from the time when the main thread is empty.

```js
setTimeout(() => {
    console.log("Call me right now!!");
}, 0); /* It will only be called when the call stack of the main thread is empty  */
```

- This is a implementation based episode.
