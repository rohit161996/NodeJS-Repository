# Namaste Node.js - Episode 1 Summary

"Any application that can be written in JavaScript will eventually be written in JavaScript."
                                                                        - Jeff Atwood, 2007
                                                                        - Founder StackOverflow

## Chapter 01: Introduction to Node.js  

### 1. What is Node.js?
- Node.js is a JavaScript runtime environment built on Chrome's V8 engine, "Run Javascript Everywhere".
- It allows JavaScript to run outside the browser, making it a powerful tool for various applications beyond web development.  
- It is a cross-platform, open-source Javascript runtime environment that can run on Windows, Linux, Unix, macOs and more.

### 2. Key Features of Node.js  
#### a) Runtime Environment  
- Node.js provides a runtime environment to execute JavaScript code outside the browser.  
- It is powered by the V8 engine, the same engine used in Google Chrome.  

#### b) Event-Driven Architecture [Node JS is Successful Due to Event driven architecture]
- Node.js follows an event-driven architecture, efficiently handling asynchronous operations.  
- This design allows it to manage multiple tasks without waiting for one to complete before starting another.  

#### c) Asynchronous I/O [Non-blocking I/O]
- Node.js performs asynchronous I/O operations, meaning tasks like reading/writing files or making network requests do not block the execution of other operations.  
- This is different from traditional synchronous programming, where tasks are executed sequentially.  

### 3. Development History of Node.js  
#### a) Creation and Early Development  
- Ryan Dahl developed Node.js in 2009.
- Spider Monkey -> Firefox.
- V8 Engine -> Google Chrome.
- Initially, he experimented with SpiderMonkey, Mozilla’s JavaScript engine, but later adopted Google’s V8 engine for its performance.  
- The project was originally named web.js but was later renamed Node.js to reflect its broader potential.  

#### b) Support from Joyent
- Joyent was working on a similar project
- Joyent, a technology company, saw potential in Node.js and supported its development.  

### 4. Comparison with Traditional Servers  
- Before Node.js, most web servers used the Apache HTTP Server, which followed a blocking I/O model, limiting the number of concurrent connections.  
- Node.js introduced a non-blocking I/O model, allowing it to handle multiple requests efficiently with fewer system resources.  

### 5. The Evolution of NPM (Node Package Manager)  
- NPM is a package manager for Node.js, allowing developers to install and manage libraries easily.  
- Developed by Joyent in 2010, it was initially available for macOS and Linux.  
- In 2011, Microsoft collaborated to bring NPM to Windows.  

### 6. Leadership and Community Transitions  
#### a) Leadership Changes  
- In 2012, Ryan Dahl stepped down, and Isaac Z. Schlueter, the creator of NPM, took over Node.js development.  

#### b) The io.js Fork and Reunification  
- In 2014, due to internal disagreements, Fedor Indutny forked Node.js and created io.js.  
- In 2015, the Node.js and io.js communities resolved their conflicts, merging back into a single project.  

#### c) Formation of the OpenJS Foundation  
- By 2019, the JS Foundation and Node.js Foundation merged, forming the OpenJS Foundation, ensuring long-term community-driven development.  

### 7. Present and Future of Node.js  
- Node.js continues to evolve with strong community support, making it one of the most popular JavaScript runtimes.  
- Its ecosystem, powered by NPM, provides a vast collection of libraries for building scalable and efficient applications.