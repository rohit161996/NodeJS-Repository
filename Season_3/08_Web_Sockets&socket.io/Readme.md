# Building a chat system ft. Web Sockets (Real Time Communication)
- The chat application uses web socket for the real time communication.
- Websocket is an underlying concept which can be used using the library socket.io.

## Real Time Chat using web sockets
- The Documentation can be found on the [Socket.io Documentation](https://socket.io/).
- The documentation is neat and clean can be used for reference :-).

## What is Socket.io?
- Socket.IO is a library that enables `low-latency`, `bidirectional` and `event-based communication` between a client and a server.
![alt text](image.png)

### Step 1: Building a frontend to Create a chat window.
- We will be creating a chat component in the frontend to send messages and get the messages.
- In the `<Connections/>` we will be having the button(Chat) to navigate to the `<Chat/>` component.
- It is like `/chat/:targetUserId`.
- This id will be read in the UI Component using the params.

### Step 2: Connection between the Client and the Server
- In the web socket the client will have to make a connection with the server.
- There will be code on the server as well as the client.

#### Step 2.1: Server Code
- [Reference Document for Server Code](https://socket.io/docs/v4/server-api/).
- We can create our own server without using `express` using the `http package`.
- We need to install the socket.io package, in the backend.
```cmd
    npm install socket.io
```

- Now we will be configuring the backend code in the `app.js`. In this project we have created the express server already, so we will have to configure the http server with care.
- In the `app.js`
```js
    /* Import the http module */
    const http = require("http");

    /* Create a server after adding all the routes in the application*/
    const server = http.createServer(app);

    /* Change the app.listen() to server.listen() */
    -app.listen();
    +server.listen();

    /* Server is needed to configure the socket.io */
    const socket = require("socket.io");

    /* Socket requires the cors configuration */
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173",
        },
    });

    /* Use the io to receive the connection and accept the connection */
    io.on("connection", (socket) => {
        /* Handle the Events */
    });
```
- Now we will write the initialization of the socket in a different file `utils/socket.js`.
- We will pass the server from the `app.js` file.
- We will try to keep the `app.js` file cleaner.
```js
const socket = require("socket.io");

const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173",
        },
    });

    io.on("connection", (socket) => {
        /* Handle the Events */
        socket.on("joinChat", ({ userId, targetUserId }) => {
            const roomId = [userId, targetUserId].sort().join("_");
            console.log(firstName+ "Join Chat", roomId);

            socket.join(roomId);
        });

        socket.on("sendMessage", () => {

        });

        socket.on("disconnect", () => {

        });
    });
}

module.exports = { initializeSocket };
```

- Now, in the socket connection there will be several participants.
- There will be a room with connected participants.
- We will be connecting the participants with the help of user ids.
- Now the message has to be sent to the room. It will be done with the help of handling the event `sendMessage` in the backend.
- In the sendMessage using the Id for the sender and receiver emit message received.  

#### Step 2.2: Client Code
- In the front end code install the `socket.io` library.
- Configure the `socket.io` in the front end code.
- In the `/utils/socket.js` configure the socket.io.
```js
    import io from "socket.io-client";
    import { BASE_URL } from "./constants";

    export const createSocketConnection = () => {
        return io(
            BASE_URL
        );
    }
```
- This configuration works on the local system but it will not work in the production.
- In the Chat component the page refresh should make connection to the socket.
- In the `<Chat/>` component create the connection to the socket using `createSocketConnection()` in the useEffect() hook.
- Now using the emit function send the targetUserId and the loggedInUserId to the backend.

## NOTE:
- We need to do the cleanup as soon as the page unloads otherwise we will have several sockets opened unnecessarily.
- The cleanup is very important, it is done when the Component is unmounted.
- The component is unmounted in the return statement in the useEffect() hook.
- Now received the message in the useEffect().

- In the Chat Component update the setMessages() and the other state variables dynamic.

## Securing the Room Id to prevent the Chat from getting hacked.
- In the Backend, we will be securing the room Id using the Hash Method.
```js
const crypto = require("crypto");

const getSecretRoomId = (userId, targetUserId) => {
    return crypto
        .createHash("sha256")
        .update([userId, targetUserId].sort().join("_"))
        .digest("hex");
}

-const roomId = [userId, targetUserId].sort().join("_");
+const roomId = getSecretRoomId(userId, targetUserId);
```

- This socket.io can be used for Chess, Tic Tac Toe etc.


