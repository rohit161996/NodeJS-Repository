# Building Real Time Chat Feature

## Step 1: Creating a Schema to Store the messages in the database:
- Now we will be storing the chat messages in the database schema.
- We will be creating a new schema named chat in the model file `models/chat.js`.
- The schema will be storing the participants in the chat, seperate chat for seperate participants, It will be referring to the User Schema.
- The schema will also be storing the messages in it.
- The schema can have other schema in it as well, like the chatSchema will have a message schema in it.
- It is good to store the message Schema in the chat Schema.

## Schema Vision
- We have made the participants in the schema as an array because we want to extend this schema in the future for the group chats.
- Otherwise for only two people in the app like chess we can write senderId and receiverId.

## Step 2: Saving the messages in the database:
- The messages should be stored in the database just after the user sends it.

- In the `socket.on("sendMessage")` before sending the message to the room, save the message in the database.

- There can be two cases in this.

### Step 2.1:
  - User can send a message for the first time.

### Step 2.2:
  - User can send a message to the already existing chat.

- Find the chat in the database with the participants in the mongoose database.
- If null is returned in the chat object from the database then create a new chat object with participants as the two users interacting for step 2.1.
- Add the messages to the chat object existing or newly created.
- Save the chat object to the database.

## Loading the Chat to the chatbox:
- As soon as the page loads the chat messages should be loaded to the chat box.
- We will be creating a new API to load the chat messages to the chat box on every page rendering.
- We will be using the useEffect() hook to load the chats using the API in our app.
- A new route will be created in the `routes/` called `chat.js` 

```js
chatRouter.get(
    "/chat/:targetUserId",
    userAuth,
    async (req, res) => {
        /* It will be returning the string so we will not be 
         * destructuring the userId */
        const userId = req.user._id;
        const { targetUserId } = req.params;
        try {
            /* We will find the chat participants and the firstName and lastName 
             * of the sender of the message will be populated to know from where 
             * the message is coming from */
            let chat = await Chat.findOne({
                participants: { $all: [userId, targetUserId] },
            }).populate({
                path: "messages.senderId",
                select: "firstName lastName",
            });
            if (!chat) {
                chat = new Chat({
                    participants: [userId, targetUserId],
                    messages: [],
                });
                await chat.save();
            }
            res.json(chat);
        }
        catch (err) {
            console.log(err);
        }
    }
);
```

- We will call this API from the `<Chat/>` Component.
- We will be using the useEffect() hook to call this API to get the chatMessages from the database.
```js
    const fetchChatMessages = async () => {
        const chat = await axios.get(
            BASE_URL + "/chat/" + targetUserId,
            { withCredentials: true }
        );

        /* We get the messages object from the chat */
        console.log(chat.data.messages);

        const chatMessages = chat?.data?.messages.map((msg) => {
            return {
                firstName: msg?.firstName,
                lastName: msg?.lastName,
                text: msg?.text
            };
        });

        setMessages(chatMessages);
    }

    useEffect(() => {
        fetchChatMessages();
    }, []);
```

- Some changes were also made to include the lastname in the chat window.

## Authentication failure in the Chat:
- If the users are not friends still they can send the messages to each other.
- To resolve this we need to verify if the Users are each other's connection or not.
- In the ConnectionRequest Schema, if the fromUserId, toUserId and status is accepted then only the users should be allowed to chat.

## Show green feature when Online.

## Auto Scroll to the last when the message is sent.

## Limit messages when fetching from the DB, build Pagination.

## How to manage millions of requests on server?

- Redis
- System Design Problem

- These things happen in the Whatsapp, Cricbuzz live commentary, Type racer etc.

## Problem in deployment of the Frontend code:
- While deploying the application the BASE_URL will not work.
- We need to do some other types of configurations.
```js
import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
    if(location.hostame === "localhost"){
        return io(BASE_URL);
    }else{
        return io("/", {path: "/api/socket.io"});
    }
}
```
- It is required because the socket connection happens on the path `www.devtinder.in/socket.io/` which we do not want.
- We want it to be on the `www.devtinder.in/app/socket.io/` in production.
- But the earlier approach will work fine on the localhost.
- This can be found in the Socket.io documentation.
