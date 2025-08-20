# Module Contents
- How modules work behind the scenes?
- How the new module is loaded to our page?
- How Node.js works behind the scene when we have multiple modules running our code?

## How does the module.exports do?
### 1. To run the nodejs code
- node xyz.js

## Question 1
What happens when we use require("./xyz.js)?

xyz.js
```js
console.log("Very Important  ")
var x = 100;
```

- We cannot access the value of the variable x outside the file xyz.js.
- Nodejs gives our code to the v8 Engine and it executes our code.

### How it is done?
```js
function x(){
    const a = 10;

    function b(){
        console.log("b");
    }
}

console.log(a);
```

- We cannot print the value of a, because it is privately scoped for both const and var.
- It will give the error a is undefined, because the wrapped code inside the functions is 
  a private space cannot be accessed outside.
- Modules work the same way in the NodeJs.
- When we use the `require("./xyz.js")` it wraps all the code present in the xyz.js like this.
```js
function(){
    console.log("Very Important  ")
    var x = 100;
    function x(){
        const a = 10;
        function b(){
            console.log("b");
        }
    }
    console.log(a);
}  
```
- It is not a normal function it is IIFE.

### Immediately Invokes Function Expression (IIFE)
- An anonymous function(function without a name) closed in the (), now it becomes an expression and is called immediately or invoked immediately.
```js
(function(){

})();
```

e.g.
```js
(function(){
    console.log("Very Important  ")
    var x = 100;
    function x(){
        const a = 10;
        function b(){
            console.log("b");
        }
    }
    console.log(a);
})();
```
- NodeJS gives this wrapped code to the v8 engine.

## Why this is required?
- It immediatley invokes the code.
- It keeps variable and function safe.
- It makes the code in the file safe and seperate from the outside world.

## How are the variables and the functions private in the different module?
- IIFE make the variable and the functions private and require statement is bringing them to the execution.

## How do you get the access to the module.export?
- Where is the module coming from -> NodeJS makes an empty object in the IIFE called module.
- Every code written in every file will be in the IIFE and it will have the `module and require`.
- These module and require are given to us by node and there are some more parameters.
```js
xyz.js
(function(module, require){

    require("./calculateSum.js")

    console.log("Very Important Java script code!")
    var x = 100;
    function x(){
        const a = 10;
        function b(){
            console.log("b");
        }
    }
    console.log(a);
})();
```

- This is why we can call the require function in the file because it is there in the IIFE.
- **NodeJS passes (module) as a parameter to the IIFE**

## Flow:-
1. Code is wrapped in the Immediatley Invoked Function Expression(IIFE) <br>
2. It is then sent to the NodeJS which has addes the module, require etc. to the IIFE.<br>
3. v8 Engine then executes the code.


# How does the require() works?
1. Resolving the module.<br>
   - require("//path");
   - require("data.json");

2. Loading the module
   - file content is loaded according to the file type

3. Wraps inside the IIFE
   
4. Evaluation of the code.
   - require, module.exports returns the function etc.

5. **Caching**
   - If there are multiple files requiring the same file.
   - Caching helps the file to be loaded once in all the file.

## NOTE:-
- All the code is not directly passed to the v8 Engine, it goes to the NodeJS as well.

## Open Source NodeJS Repository:
- libuv is a beast -> Multithreading, EventLoop etc. is a power of the libuv.
- https://github.com/nodejs/node/tree/main/deps/uv

## Where is the require function?

## Where is the setTimeOut?
- [node/lib/timers.js](https://github.com/nodejs/node/blob/main/lib/timers.js)
- Take the polyfill from here, get the signature from here.
- It is also doing module.exports.



